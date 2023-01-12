const User = require('../models/opensea');
const db = require('../util/database');
const osClient = require('../util/opensea').client;
const osSDK = require('../util/opensea').SDK;



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
    let addCollection = await User.updateOne({
      address: req.body.address
    }, {
      $push : { collections: nftCollection.collection.name}
    })
    if (addCollection.modifiedCount === 1) {
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