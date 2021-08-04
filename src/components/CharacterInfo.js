import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/CharacterInfo.css'

const CharacterInfo = ({match}) => {
  const [character, setCharacter] = useState({})
  const id = match.params.id

  useEffect(()=>{
    axios.get(`https://www.breakingbadapi.com/api/characters/${id}`)
      .then((response)=> {
        const result = response.data
        setCharacter(...result)
      })
      .catch((err)=>{
        alert(err.message)
      })
  },[])
  
  const calculateAge = (dob) => {
    if(dob==="Unknown"){
        return "Unknown"
    }
    const yearNeeded = dob && dob.split("-")[2]
    const age = new Date().getUTCFullYear() - yearNeeded
    return age
  }

  return (
    <div className="main-container">
    {
    Object.keys(character).length>0 && 
      <div className="flex-container">
        <div className="main-intro">
            <img src={character.img} alt={character.nickname}/>
            <h2 style={{padding:"20px 0"}}>{character.name}</h2>
        </div>
          <div style={{color: `${character.status === "Alive"?"#5cb85c":"#d9534f"}`}} className="info-section">
              <h1>{character.nickname}</h1>
              <div><span style={{fontSize:'medium', padding:'10px 30px',backgroundColor: '#333', borderRadius:'5px', color: `${character.status === "Alive"?"#5cb85c":"#d9534f"}`}}><i className="fas fa-circle"></i> <strong>{character.status}</strong></span></div>
            <h2>Age : {calculateAge(character.birthday)}</h2>
            <div className="character-occupation">
                <h2 style={{paddingBottom:'5px'}}>Occupation</h2>
                <div>
                  {character.occupation && character.occupation.map((ele,i)=>{
                  return <div className="occupation-list" key={i}><strong>{ele}</strong></div>
                  })}                  
                </div>
            </div>
        </div>
      </div>
    }
    <Link style={{color:"#d9534f"}} className="navigate-link" to="/"><i class="fas fa-arrow-alt-circle-left fa-3x"></i></Link>
    </div>
  )
}

export default CharacterInfo;