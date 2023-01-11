import './App.css';
import Home from '../Home/Home'
import Feed from '../Feed/Feed'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import {configureChains, createClient, WagmiConfig, useAccount, useConnect } from "wagmi";
import {mainnet} from 'wagmi/chains'
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import merge from 'lodash.merge';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: '#EB455F',
  },
});

const { chains, provider } = configureChains(
  [mainnet],
  [alchemyProvider({ alchemyId: process.env.REACT_APP_RPC }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={myTheme} chains={chains}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
