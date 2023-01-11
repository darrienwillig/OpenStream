import { useRef, useState } from 'react';
import styles from './feed.module.css'

export default function Search({}) {
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
        slug: inputRef.current.value
      }
    fetch('/api/opensea/add/', {
      method: 'POST',
      headers: {
          "Content-Type":"application/json",
    },
      body: JSON.stringify(body)
    })
    .then((data) => {return data.text()})
    .catch((err) => console.log('error', err))
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <input id={styles.searchQueryInput} type="text" name="searchQueryInput" placeholder="Search" ref={inputRef} />
          <button id={styles.searchQuerySubmit} type="submit" name="searchQuerySubmit" onClick={(e) => {handleSubmit(e)}}>
            <svg style={{width: '24px', height: '24px'}} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
             </svg>
          </button>
      </div>
    </div>
  )
}