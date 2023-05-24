import { useState, useContext } from 'react';
import { ContextGlobal } from './utils/global.context';
import style from '../styles/productCard.module.css'
import { Link, useNavigate } from "react-router-dom";
import { getWordCalification, getStarsCalification, isFav, setLocalStorageFavs, clearFromFavs } from './utils/usefulFunctions';
import PopUpMap from './PopUpMap';

const RecomendationCard = ({data}) => {

  const {state:{fav}, dispatch} = useContext(ContextGlobal)
  const navigate = useNavigate();
  
  const {id, titulo, descripcion, categoria, imagenes, puntuacion, clasificacion, latitud, longitud} = data;
  imagenes.sort((a,b) => a.id - b.id);

  /* const [position, setPosition] = useState([latitud, longitud])
  const [watchMap, setWatchMap] = useState(true)

  const handlePosition = () => {

  } */

  const addFav = () => {
    if(localStorage.getItem("token")){
      dispatch({type: "FAV", payload: !fav})
      if(!isFav(id)){
        setLocalStorageFavs({id, titulo, descripcion, categoria, imagenes, puntuacion, clasificacion, latitud, longitud});
      }else {
        clearFromFavs(id, titulo);
      }
    }else{
      navigate("/iniciar-sesion")   
    }
  }

  return (
    <article className={style.containerRecoCard}>
      {/* <div className={style.imgDiv}>
        {watchMap ? <PopUpMap position={position}/> : <img src={imagenes[0].urlImagen} alt={titulo}/>}
        <i className="fa-sharp fa-solid fa-heart"></i>
      </div> */}

      <div className={style.imgDiv}>
        <img src={imagenes[0].urlImagen} alt={titulo}/>
        {
          isFav(id) ?
          <i onClick={addFav} style={{color: "#F0572D"}} className="fa-solid fa-heart-circle-minus fa-beat"></i> :
          <i onClick={addFav} className="fa-sharp fa-regular fa-heart fa-beat"></i>
        }
      </div>

      <div className={style.infoCard}>
        <div className={style.headerCard}>
          <div className={style.titleDiv}>
            <p>{categoria.titulo}{getStarsCalification(clasificacion)}</p>
            <h2>{titulo}</h2>
          </div>
          <div className={style.calificationDiv}>
            <p>{puntuacion * 2}</p>
            <h4>{getWordCalification(puntuacion)}</h4>
          </div>
        </div>
        <div className={style.locationDiv}>
          <i className="fa-solid fa-location-dot"></i>
          <p>A 940m del centro<span>MOSTRAR EN EL MAPA</span></p>
        </div>
        <div className={style.descriptionCard}>
          
          <p>{descripcion.slice(0,80)}.<span><Link to={`/producto/${id}`} data={data} className="verMasButton">más...</Link></span></p>
          
          <Link to={`/producto/${id}`} data={data} className="verMasButton">
            <button >ver más</button>
          </Link>
        </div>
      </div>
      
    </article>
  )
}

export default RecomendationCard


