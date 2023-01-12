import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import styles from './feed.module.css'
import fakeData from '../../fakedata/fakeData';
import Card from './Card';
import FilterBox from './FilterBox';
import StatBox from './StatBox';


export default function Box({buys, currentCollections, currentFilter, currentVolumes, handleChange, handleNewCollection}) {


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