import { useState, useEffect } from 'react';
import styles from './feed.module.css'
import fakeData from '../../fakedata/fakeData';
import Card from './Card'
import FilterBox from './FilterBox'

export default function Box({}) {
  const [buys, setBuys] = useState(fakeData);
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleChange = (e) => {
    setCurrentFilter(e.target.value)
  }


  return (<>
    <div className={styles.filterBox}>
      <FilterBox currentFilter={currentFilter} handleChange={handleChange} />
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