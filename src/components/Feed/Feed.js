import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi'
import { Navigate } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from './feed.module.css';
import Search from './Search.js';
import Box from './Box.js';


export default function Feed() {
  const { connector: activeConnector, isConnected } = useAccount()

  if (isConnected) {
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