import React, { useContext, useEffect } from 'react'
import ProductCard from './ProductCard'
import style from '../styles/recomendation.module.css'
import { ContextGlobal } from './utils/global.context'

const Recomendation = () => {

  const { state:{ ProductosR, ProductosF, Favs }} = useContext(ContextGlobal)

  const renderProductos = ( ) => {
    return ProductosF.length == 0 ? ProductosR : ProductosF.slice(0,8);
  }

  useEffect(() => {
        renderProductos()
  }, [ProductosF])
  
  return (
    <div className={style.containerReco}>
        <h2 className={style.recoTitle}>Recomendaciones</h2>
        <div className={style.containerCards}>
        {(renderProductos())?.map( (producto, index) => <ProductCard key={producto.titulo + index} data={producto}/>)}
        </div>
    </div>
  )
}

export default Recomendation