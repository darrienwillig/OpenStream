import { useState, useEffect, useRef } from 'react';
import styles from './feed.module.css'
import Card from './Card';
import FilterBox from './FilterBox';
import StatBox from './StatBox';
import 'animate.css';







export default function Box({buys, currentCollections, currentFilter, currentVolumes, handleChange, handleNewCollection}) {
  const [oldCards, setOldCards] = useState(buys);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [expandedData, setExpandedData] = useState([])
  const handleOpen = (event) => {
    const filtered = oldCards.filter((item, index) => {
      return item.imgUrl === event.target.parentElement.firstChild.src
    })
    setExpandedData(filtered)
    console.log(filtered)
    setOpen(true);
  };
  const handleClose = (e) => {
    if (e.target.nodeName !== "BUTTON") setOpen(false)
  };

  const getDifference = () => {
    if (window.localStorage.getItem('buys')) {
    let totalDiff = buys.length - oldCards.length;
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


  console.log(buys.length);

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
        buys.map((item, index) => {
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
                handleOpen={handleOpen}
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

