import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import styles from './feed.module.css'
import fakeData from '../../fakedata/fakeData';
import Card from './Card';
import FilterBox from './FilterBox';
import fakeCollections from '../../fakedata/fakeCollections';
import StatBox from './StatBox';
import fakeVolume from '../../fakedata/fakeVolume';
import axios from 'axios'

export default function Box({}) {
  const { address } = useAccount();
  const [buys, setBuys] = useState(fakeData);
  const [currentCollections, setCurrentCollections] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentVolumes, setCurrentVolumes] = useState(fakeVolume);

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
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getCollections()
  }, [])

  console.log(currentCollections)

  return (<>
    <div className={styles.filterBox}>
      <FilterBox currentFilter={currentFilter} handleChange={handleChange}  currentCollections={currentCollections}/>
    </div>
    <div className={styles.cardbox}>
      {
        currentFilter === 'all' &&
        buys.map((item, index) => {
          return (
            <Card
              key={index}
              image={item.picture}
              price={item.price}
              collection={item.collection}
            />
          )
        })
      }
      {
        currentFilter!== 'all' &&
        buys.filter((item) => {
          return item.collection === currentFilter;
        }).map((item, index) => {
          return (
            <Card
              key={index}
              image={item.picture}
              price={item.price}
              collection={item.collection}
            />
          )
        })
      }
    </div>
    <div className={styles.statbox}>
        <StatBox  fakeVolume={currentVolumes}/>
    </div>
    </>
  )
}