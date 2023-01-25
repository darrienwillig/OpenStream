const User = require('../models/opensea').User;
const Main = require('../models/opensea').Main;
const db = require('../util/database');
const osClient = require('../util/opensea').client;
const osSDK = require('../util/opensea').SDK;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


 (async () => {
  const getMain = await Main.findOne({address: 'main'});
  for (let i = 0; i < getMain.collections.length; i++) {
    osClient.onItemSold(`${getMain.collections[i]}`, async (event) => {
      let data = {
        slug: event.payload.collection.slug,
        price: (Number(event.payload.sale_price) / 1e18).toLocaleString('en-us', {maximumFractionDigits: 2}),
        imgUrl: event.payload.item.metadata.image_url,
        time: event.payload.event_timestamp,
        name: event.payload.item.metadata.name || event.payload.collection.slug,
        toAddress: event.payload.taker.address,
        itemLink: event.payload.item.permalink,
        hash: event.payload.transaction.hash
      }
      let addToMain = await Main.updateOne({
        address: 'main',
      }, {
        $push : {  sales: data}
      })

      if(addToMain.modifiedCount === 1) {
        console.log('Added new sale to main document')
      }
    })
  }
})()



exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      address: req.body.address,
      collections: []
    });
    console.log(user);
    return res.status(201).json({
      message: 'User created successfully',
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).json({
        error: 'Duplicate Entry'
      });
    }
  }
}

exports.addCollection = async (req, res, next) => {
  try {
    const findUser = await User.findOne({address: req.body.address});
    if (!findUser) throw Error

    let nftCollection = await osSDK.api.get(`/collection/${req.body.slug}`);

    let data = {
      slug: nftCollection.collection.slug,
      name: nftCollection.collection.name
    }

    let addCollection = await User.updateOne({
      address: req.body.address
    }, {
      $push : { collections: data}
    })

    if (addCollection.modifiedCount === 1) {
       await Main.updateOne({
        address: 'main'
      }, {
        $push : { collections: nftCollection.collection.slug}
      })

      osClient.onItemSold(`${nftCollection.collection.slug}`, async (event) => {
        let data = {
          slug: event.payload.collection.slug,
          price: (Number(event.payload.sale_price) / 1e18).toLocaleString('en-us', {maximumFractionDigits: 2}),
          imgUrl: event.payload.item.metadata.image_url,
          time: event.payload.event_timestamp,
          name: event.payload.item.metadata.name || event.payload.collection.slug,
          toAddress: event.payload.taker.address,
          itemLink: event.payload.item.permalink,
          hash: event.payload.transaction.hash
        }
        let addToMain = await Main.updateOne({
          address: 'main',
        }, {
          $push : { sales: data}
        })

        if(addToMain.modifiedCount === 1) {
          console.log('Added new sale to main document')
        }
      })
      return res.status(201).json({ message: `Succesfully added ${nftCollection.collection.name} to list`})
    }
  } catch (err) {
    return res.status(404).json({ message: 'Collection not added' });
  }
}

exports.getCollections = async (req, res, next) => {
  try {
    const findUser = await User.findOne({address: JSON.parse(req.query['0']).address});
    if (!findUser) throw Error
    return res.status(200).json(findUser.collections)
  } catch (e) {
    return res.status(500).json({ message: 'Invalid request'})
  }

}

exports.getBuys = async (req, res, next) => {
  try {
    let main = await Main.findOne({address: 'main'});
    if (!main) throw Error




    return res.status(200).json(main.sales)
  } catch (err) {
    return res.status(500).json({ message: 'Invalid request'})
  }
}

exports.getVolume = async (req, res, next) => {
  try {
    let main = await Main.findOne({address: 'main'});
    if (!main) throw Error
    let arr = [];
    for (let i = 0; i < main.collections.length; i++) {
      let volumeData = await osSDK.api.get(`/collection/${main.collections[i]}`);
      let data = {
        name: volumeData.collection.name,
        onedaysales: volumeData.collection.stats.one_day_volume,
        totalsales: volumeData.collection.stats.total_volume,
        floor: volumeData.collection.stats.floor_price
      }
      arr.push(data);
      await sleep(5000);
    }
    return res.status(200).json(arr);
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: e})
  }
}