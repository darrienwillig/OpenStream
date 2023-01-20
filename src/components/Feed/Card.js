import { useState, useEffect } from 'react';
import styles from './feed.module.css'
import ReactTimeAgo from 'react-time-ago';
import 'animate.css';




export default function Card({expanded, newcard, image, price, collection, timestamp, handleOpen}) {
  var date = new Date(timestamp);

  return (<>
    <aside id={expanded ? styles.modalBox : styles.card} className={newcard !== undefined ? 'animate__animated animate__flip animate__slow' : ''} onClick={(e) => handleOpen !== undefined ? handleOpen(e): null}>
      <img src={image} alt='image' width="100%" height="50%" style={{borderRadius: '5px 5px'}}/>
      <div className={styles.detailContainer}>
        <small className={styles.cardname}>{collection}</small>
        <small className={styles.price}>{`💰 ${price} Ξ`}</small>
        <small className={styles.cardtime}>Bought: <ReactTimeAgo date={date} locale="en-US"/></small>
      </div>
    </aside>
    </>
  )
}