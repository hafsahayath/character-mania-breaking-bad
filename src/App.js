import "./styles.css";
import ListingCharacters from './components/ListingCharacters'
import { Route } from 'react-router-dom'
import CharacterInfo from './components/CharacterInfo'

export default function App() {
  return (
    <div className="App container">
      <h1 className="main-heading">Breaking Bad</h1>

      <Route path="/" component={ListingCharacters} exact/>
      <Route path="/characters/:id" component={CharacterInfo} />  
    </div>
  );
}
