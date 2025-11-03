import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams
} from 'react-router-dom'
import axios from 'axios'

import './App.css'



const Navs = (props) => {
  const {prev, next} = props;
  
  if (!prev && !next) {
    return (
      <div></div>
    )
  } 


  if (!prev) {
    return (
      <div>
        <Link to={`/kuvat/${next}`}> next </Link>  
      </div>
    )
  } 
  

  if (!next) {
    return (
      <div>
        <Link to={`/kuvat/${prev}`}> prev </Link>  
      </div>
    )
  } 

  return (
    <div>
      <Link to={`/kuvat/${prev}`}> prev </Link>  
      <Link to={`/kuvat/${next}`}> next </Link>  
    </div>
  )
}





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


const Kuva = ({kuvat}) => {
  const id = useParams().id;
  const kuva = kuvat.find(n => n.id === Number(id));

  const index = kuvat.indexOf(kuva);  
  let prev = false;
  let next = false;


  if (index > 0) {
    prev = kuvat[index-1].id;
  }

  if (index < kuvat.length-1) {
    next = kuvat[index+1].id;  
  }


  return (
    <div>
      <Link to="/kuvat">Show all</Link>

      <p><img src={kuva.url}/></p>
      <ul>
        <li>Album: {kuva.album}</li>
        <li>Name: {kuva.name}</li>
      </ul>
    <Navs prev={prev} next={next}/>
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
    axios.get('http://localhost:3001/kuvalista').then(response => {
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
