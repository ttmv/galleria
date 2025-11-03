import { Link, useParams } from 'react-router-dom'



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



const paramExtr = (kuva, kuvat) => {
  //console.log("kuva", kuva);
  const album = kuva.album;
  const name = kuva.name;
  const url = "/kuv/" + album + "/" + kuva.url;

  const index = kuvat.indexOf(kuva);  
  let prev = false;
  let next = false;

  if (index > 0) {
    prev = kuvat[index-1].id;
  }

  if (index < kuvat.length-1) {
    next = kuvat[index+1].id;  
  }

  return {album, name, url, prev, next };  
}


const Kuva = ({kuvat}) => {
  const id = useParams().id;
  const kuva = kuvat.find(n => n.id === Number(id));

  //console.log("kuva", kuva);
  
  const {album, name, url, prev, next} = paramExtr(kuva, kuvat);

  return (
    <div>
      <Link to="/kuvat">Show all</Link>

      <p><img src={url}/></p>
      <ul>
        <li>Album: {album}</li>
        <li>Name: {name}</li>
      </ul>
    <Navs prev={prev} next={next}/>
    </div>
  )
}



export default Kuva
