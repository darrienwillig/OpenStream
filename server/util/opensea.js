const openSea = require('@opensea/stream-js');
const connection = require('ws');
const ws = require('ws').WebSocket;
const { OpenSeaSDK, Network } = require('opensea-js');
let Web3            = require('web3');


// const client = new openSea.OpenSeaStreamClient({
//   network: openSea.Network.MAINNET,
//   token: process.env.REACT_APP_OS_API,
//   connectOptions: {
//       transport: ws.WebSocket
//     },
//   onError: (obj) => console.error(obj.message)
// });


const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_RPC);

const SDK = new OpenSeaSDK(provider, {
    networkName: Network.Main,
    apiKey: process.env.REACT_APP_OS_API
})

module.exports = { SDK };