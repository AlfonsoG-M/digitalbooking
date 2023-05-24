import React, { useContext } from 'react'
import { ContextGlobal } from './utils/global.context';
import style from "../styles/productLocation.module.css"

const ProductLocation = () => {

  const { state:{CiudadPE} } = useContext(ContextGlobal);

  return (
    <div className={style.container}>
        <div className={style.locationDiv}>
            <i className="fa-solid fa-location-dot"></i>
            <div className={style.location}>
                <p>{CiudadPE.nombre}, {CiudadPE.provincia}, {CiudadPE.pais}. </p>
                <p>A 940 m del centro</p>
            </div>
        </div>
        <div className={style.calificationDiv}>
            <div className={style.starsDiv}>
                <p>Muy bueno</p>
                <p className={style.stars}><span>★★★★</span>★</p>
            </div>
            <p>8</p>
        </div>
    </div>
  )
}

export default ProductLocation