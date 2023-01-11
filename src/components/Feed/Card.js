import { useState, useEffect } from 'react';
import styles from './feed.module.css'


export default function Card({image, price}) {
  return (
    <aside className={styles.card}>
      <img src={image} alt='image' width="100%" height="50%" style={{borderRadius: '5px 5px'}}/>
      <small className={styles.price}>{price}</small>
    </aside>
  )
}