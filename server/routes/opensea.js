const controller = require('../controllers/opensea');
const router = require('express').Router();



router
//  .post('/add', controller.addCollection)
 .post('/create', controller.createUser)
//  .get('/collections', controller.getCollections)


module.exports = router;