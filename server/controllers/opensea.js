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

// exports.addCollection = async (req, res, next) => {
//   try {
//     await osSDK.api.get(`/collection/${req.body.slug}`);
//     let addCollection = await User.create({
//       address: req.body.address,

//     })
//   } catch (err) {
//     return res.status(404).json({ message: 'Collection not added' });
//   }
// }