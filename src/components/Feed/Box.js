import { useState, useEffect, useRef } from 'react';
import styles from './feed.module.css'
import Card from './Card';
import FilterBox from './FilterBox';
import StatBox from './StatBox';
import 'animate.css';
import Delayed from './Delayed';
import NewCard from './NewCard';




export default function Box({buys, currentCollections, currentFilter, currentVolumes, handleChange, handleNewCollection, difference}) {

  const [open, setOpen] = useState(false);
  const [expandedData, setExpandedData] = useState([])
  const handleOpen = (event) => {
    const filtered = buys.filter((item, index) => {
      return item.imgUrl === event.target.parentElement.firstChild.src
    })
    setExpandedData(filtered)
    setOpen(true);
  };
  const handleClose = (e) => {
    if (e.target.nodeName !== "BUTTON") setOpen(false)
  };


  console.log(difference)

 //toAddress, itemLink, hash
  return (<>
      { open &&
        <div id={styles.modal} onClick={(e) => handleClose(e)}>
          <Card
            newcard={true}
            expanded={true}
            image={expandedData[0]?.imgUrl}
            price={expandedData[0]?.price}
            collection={expandedData[0]?.name}
            timestamp={expandedData[0]?.time}
          />
          <div id={styles.buttonContainer} className='animate__animated animate__slideInRight animate__slow'>
            <button className={styles.buttons} onClick={() => window.open(`http://etherscan.io/tx/${expandedData[0]?.hash}`)}>Transaction</button>
            <button className={styles.buttons} onClick={() => window.open(`${expandedData[0]?.itemLink}`)}>NFT</button>
          </div>
        </div>
      }

    <div className={styles.filterBox}>
      <FilterBox currentFilter={currentFilter} handleChange={(e) => {handleChange(e)}}  currentCollections={currentCollections}/>
    </div>
    <div className={styles.cardbox}>
      {
        currentFilter === 'all' &&
        buys.slice(0, difference).map((item, index) => {
          return (
            <NewCard
              key={index}
              image={item.imgUrl}
              price={item.price}
              collection={item.name}
              timestamp={item.time}
              handleOpen={handleOpen}
            />
          )
        })
      } {
        currentFilter === 'all' &&
        buys.slice(difference).map((item, index) => {
            return (
              // <Delayed waitBeforeShow={50}>
                <Card
                  key={index}
                  image={item.imgUrl}
                  price={item.price}
                  collection={item.name}
                  timestamp={item.time}
                  handleOpen={handleOpen}
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
              handleOpen={handleOpen}
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

