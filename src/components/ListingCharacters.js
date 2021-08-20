import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../styles/ListingCharacters.css'

const ListingCharacters = (props) => {
  const [characters, setCharacters] = useState([])

  useEffect(()=>{
    axios.get('https://www.breakingbadapi.com/api/characters')
      .then((response)=>{
        const result = response.data
        setCharacters(result)
      })
      .catch((err)=>{
        alert(err.message)
      })
  },[])

  return (
    <div className="main-grid">
      { characters.length > 0 &&
        characters.map(ele=>{
          return (
            <div className="character-box" key={ele.char_id}>
                <Link to={`characters/${ele.char_id}`}>
                  <img style={{width:'100%', height: '50vh'}} src={ele.img} alt={ele.name} />
                </Link> <br />
                <p className={`${ele.status === "Alive"?'link-style-alive':'link-style-dead'}`}><strong>{ele.name}</strong></p>
            </div>
          )
      })}
    </div>
  )
}

export default ListingCharacters;