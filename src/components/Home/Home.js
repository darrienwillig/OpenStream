import { useState, useEffect } from 'react';
import styles from './home.module.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from 'wagmi';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


export default function Home() {
  const { connector: activeConnector, isConnected } = useAccount()

  return (
  <>
    <div className={styles.logo}>
      <img src="newlogo.png" alt="logo" width={400} height={400} />
    </div>
    <div className={styles.container} id ='buttonshake'>
      <ConnectButton/>
      {
        isConnected &&
        <Navigate to="/feed"/>
      }
    </div>
    </>
  );
}