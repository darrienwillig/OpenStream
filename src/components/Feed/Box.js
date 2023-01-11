import { useState, useEffect } from 'react';
import styles from './feed.module.css'
import fakeData from '../../fakedata/fakeData';
import Card from './Card'
import FilterBox from './FilterBox'
import fakeCollections from '../../fakedata/fakeCollections'

export default function Box({}) {
  const [buys, setBuys] = useState(fakeData);
  const [currentCollections, setCurrentCollections] = useState(fakeCollections)
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleChange = (e) => {
    setCurrentFilter(e.target.value)
  }


  useEffect(() => {

  }, [currentFilter])


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
    <div className={styles.filterBox}>
      STATS BOX
    </div>
    </>
  )
}