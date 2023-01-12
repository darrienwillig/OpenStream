import { useState, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi'
import styles from './feed.module.css'
import fakeData from '../../fakedata/fakeData';
import Card from './Card';
import FilterBox from './FilterBox';
import StatBox from './StatBox';


export default function Box({buys, currentCollections, currentFilter, currentVolumes, handleChange, handleNewCollection}) {

  if (buys.length > 300) {
    buys.splice(300)
  }
  buys.reverse()
  return (<>
    <div className={styles.filterBox}>
      <FilterBox currentFilter={currentFilter} handleChange={(e) => {handleChange(e)}}  currentCollections={currentCollections}/>
    </div>
    <div className={styles.cardbox}>
      {
        currentFilter === 'all' &&
        buys.map((item, index) => {
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
        <StatBox  fakeVolume={currentVolumes}/>
    </div>
    </>
  )
}

