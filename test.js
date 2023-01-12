const osSDK = require('./server/util/opensea').SDK

const test = async () => {
  try {
   let testing = await osSDK.api.get('/collection/gesgrtgsrt');
   if (testing.collection) {
    console.log(testing)
   }
  } catch (e) {
    console.log('sdfss')
  }
}



test()