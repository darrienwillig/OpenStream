const osSDK = require('./server/util/opensea').SDK

const test = async () => {
  try {
   let testing = await osSDK.api.get('/collection/boredapeyachtclub');
   if (testing.collection) {
    console.log(testing.collection.name)
   }
  } catch (e) {
    console.log('sdfss')
  }
}



test()