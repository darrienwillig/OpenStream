import { useEffect, useState, useRef } from 'react';
import { useAccount, useConnect } from 'wagmi'
import { Navigate } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from './feed.module.css';
import Search from './Search.js';
import Box from './Box.js';
import axios from 'axios';
import fakeVolume from '../../fakedata/fakeVolume';
// import fakeData from '../../fakedata/fakeData';

export default function Feed() {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const [buys, setBuys] = useState([]);
  const [currentCollections, setCurrentCollections] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentVolumes, setCurrentVolumes] = useState(fakeVolume);
  const [newCollection, setNewCollection] = useState(false)

  const handleChange = (e) => {
    setCurrentFilter(e.target.value)
  }

  const getCollections = () => {
    let data = JSON.stringify({
      "address": address,
    });

    let config = {
      method: 'get',
      url: 'http://localhost:3001/api/opensea/collections',
      headers: {
        'Content-Type': 'application/json'
      },
      params : data
    };
    axios(config)
      .then(res => {
        setCurrentCollections(res.data)
        getInitBuys(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getInitBuys = (collections) => {
    let arr = [];
    axios
     .get('http://localhost:3001/api/opensea/buys')
     .then((response) => {
      for (let i = 0; i < collections.length; i++) {
        let filtered = response.data.filter((sale) => {
          return sale.slug === collections[i].slug
        })
        if (filtered.length > 0) {
          arr.push(filtered);
        }
      }
        setBuys(arr.flat(Infinity))
     })
     .catch((err) => console.log(err))
  }

  useInterval(() => {
    getBuys()
  }, 2000)
  const getBuys = () => {
    let arr = [];
    axios
     .get('http://localhost:3001/api/opensea/buys')
     .then((response) => {
      for (let i = 0; i < (currentCollections.length); i++) {
        let filtered = response.data.filter((sale) => {
          return sale.slug === currentCollections[i].slug
        })
        if (filtered.length > 0) {
          arr.push(filtered);
        }
      }
      if (arr.flat(Infinity).length > 0 && arr.flat(Infinity).length > buys.length) {
        setBuys(arr.flat(Infinity))
      }
     })
     .catch((err) => console.log(err))
  }

  const handleNewCollection = (e, inputRef) => {
    e.preventDefault();
    let data = JSON.stringify({
      "address": address,
      "slug": inputRef.current.value
    });

    let config = {
      method: 'post',
      url: 'http://localhost:3001/api/opensea/add',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
     .then(res => {
      setNewCollection(true)
     })
     .catch((err) => {
       console.log(err);
     })
  }

  useEffect(() => {
   getCollections();
  }, [])

  useEffect(() => {
    if (!newCollection) return;
    getCollections()
    setNewCollection(false);
  }, [newCollection])


  // useEffect(() => {
  //   if (!isConnected) return;
  //     if (!window.localStorage.getItem('created')) {
  //       createUser();
  //     }
  // }, [isConnected])

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
    return (
      <>
        <div className={styles.connectbtn}>
          <ConnectButton />
        </div>
        <div className={styles.boxcontainer}>
          <div className={styles.searchcontainer}>
            <Search handleNewCollection={handleNewCollection}/>
          </div>
          <div className={styles.streambox}>
            <Box  buys={buys} currentCollections={currentCollections} currentFilter={currentFilter} currentVolumes={currentVolumes} handleChange={handleChange} />
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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}