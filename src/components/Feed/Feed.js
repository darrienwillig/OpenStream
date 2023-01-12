import { useEffect, useState, useMemo } from 'react';
import { useAccount, useConnect } from 'wagmi'
import { Navigate } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from './feed.module.css';
import Search from './Search.js';
import Box from './Box.js';
import axios from 'axios';


export default function Feed() {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const [created, setCreated] = useState(false);

  const createUser = () => {
    let data = {
      address: address
    }
    axios
     .post('http://localhost:3001/api/opensea/create', data)
     .then((resp) => {
      console.log(resp)
      window.localStorage.seItem('created', true)
     })
     .catch((error) => {
       console.log(error);
     })
  }

  if (isConnected) {
    if (!window.localStorage.getItem('created')) {
      createUser();
    }
    return (
      <>
        <div className={styles.connectbtn}>
          <ConnectButton />
        </div>
        <div className={styles.boxcontainer}>
          <div className={styles.searchcontainer}>
            <Search />
          </div>
          <div className={styles.streambox}>
            <Box />
          </div>
        </div>
      </>
    )
  } else {
    return (
      <><Navigate to="/" /></>
    )
  }
}