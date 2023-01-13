import { useState, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi'
import styles from './feed.module.css'
import fakeData from '../../fakedata/fakeData';
import Card from './Card';
import FilterBox from './FilterBox';
import StatBox from './StatBox';


export default function Box({buys, currentCollections, currentFilter, currentVolumes, handleChange, handleNewCollection}) {
  const [oldCards, setOldCards] = useState(buys);
  const [total, setTotal] = useState(0);

  const getDifference = () => {
    if (window.localStorage.getItem('buys')) {
    let totalDiff = buys.length - oldCards.length;
    console.log(totalDiff)
    setTotal(totalDiff);
    }
    setOldCards(buys);
    window.localStorage.setItem('buys', buys);
  }

  useEffect(() => {
    getDifference();
  }, [buys]);

  useEffect(() => {
    setTotal(0)
  }, [currentFilter])

  if (buys.length > 300) {
    buys.slice(300)
  }
  return (<>
    <div className={styles.filterBox}>
      <FilterBox currentFilter={currentFilter} handleChange={(e) => {handleChange(e)}}  currentCollections={currentCollections}/>
    </div>
    <div className={styles.cardbox}>
      {
        currentFilter === 'all' &&
        buys.sort((x, y) => {
          let xDate = new Date(x.time);
          let yDate = new Date(y.time);
          return yDate - xDate
        }).map((item, index) => {
          if (index < total) {
            for (let i = 0; i< total; i++) {
              return (
                <Card
                newcard={true}
                key={index}
                image={item.imgUrl}
                price={item.price}
                collection={item.name}
                timestamp={item.time}
              />
              )
            }
          }
          return (
            <Card
              key={index}
              image={item.imgUrl}
              price={item.price}
              collection={item.name}
              timestamp={item.time}
            />
          )
        })
      }
      {
        currentFilter!== 'all' &&
        buys.filter((item) => {
          return item.slug === currentFilter;
        }).sort((x, y) => {
          let xDate = new Date(x.time);
          let yDate = new Date(y.time);
          return yDate - xDate
        }).map((item, index) => {
          return (
            <Card
              key={index}
              image={item.imgUrl}
              price={item.price}
              collection={item.name}
              timestamp={item.time}
            />
          )
        })
      }
    </div>
    <div className={styles.statbox}>
      <div className={styles.statBoxItemContainer}>
        <StatBox  currentVolume={currentVolumes}/>
      </div>
    </div>
    </>
  )
}

