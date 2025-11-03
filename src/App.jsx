import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams
} from 'react-router-dom'
import axios from 'axios'

import Kuva from './components/Kuva.jsx'
import './App.css'



const Kuvat = ({kuvat}) => {
  console.log("kuvat", kuvat);
  return (
    <div>
      <div>
        {kuvat.map(kuva => 
          <span key={kuva.id}>            
            <Link to={`/kuvat/${kuva.id}`}> <img src={kuva.thumb} alt={kuva.alt}/> </Link>            
          </span>
        )}
      </div>
    </div>
  )
}



const Home = () => {
  return (
    <>
      <div>
        <h1></h1>
        <Link to="/kuvat">Kuvat</Link>
      </div>
    </>
  )
}




const App = () => {
  const [kuvat, setKuvat] = useState([]); 
  
  useEffect(() => {
    axios.get('http://localhost:3001/kuvalista2').then(response => {
      setKuvat(response.data);
    });
        
  }, []);


  return (
    <Router>
      <div>
      </div>

      <Routes>
        <Route path="/kuvat/:id" element={<Kuva kuvat={kuvat} />} />
        <Route path="/kuvat" element={<Kuvat kuvat={kuvat} />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </Router>

  )
}


export default App
