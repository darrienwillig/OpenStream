import { useState, useEffect } from 'react';
import styles from './feed.module.css'
import fakeData from '../../fakedata/fakeData';
import Card from './Card'

export default function Box({}) {
  const [buys, setBuys] = useState(fakeData);
  console.log(fakeData.length)

  return (<>
    <div className={styles.filterBox}>
      FILTER BOX
    </div>
    <div className={styles.box}>
      {
        buys.map((item, index) => {
          return (
            <Card
              key={index}
              image={item.Picture}
              price={item.Price}
            />
          )
        })
      }
    </div>
    <div className={styles.filterBox}>
      STATS BOX
    </div>
    </>
  )
}