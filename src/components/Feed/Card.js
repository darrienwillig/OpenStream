import { useState, useEffect } from 'react';
import styles from './feed.module.css'
import ReactTimeAgo from 'react-time-ago'



export default function Card({image, price, collection, timestamp}) {
  var date = new Date(timestamp);
  return (
    <aside className={styles.card}>
      <img src={image} alt='image' width="100%" height="50%" style={{borderRadius: '5px 5px'}}/>
      <div className={styles.detailContainer}>
        <small className={styles.price}>{`💰 ${price} Ξ`}</small>
        <small className={styles.cardname}>{collection}</small>
        <small className={styles.cardtime}>Bought: <ReactTimeAgo date={date} locale="en-US"/></small>
      </div>
    </aside>
  )
}