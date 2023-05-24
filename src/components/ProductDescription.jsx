import React, { useContext } from 'react'
import { ContextGlobal } from './utils/global.context'
import style from "../styles/productDescription.module.css"

const ProductDescription = () => {

  const { state:{ProductoE, CiudadPE} } = useContext(ContextGlobal);
 
  return (
    <div className={style.container}>
        <h2>Alojate en el corazón de {CiudadPE.nombre}</h2>
        <p>{ProductoE.descripcion}</p>
    </div>
  )
}

export default ProductDescription