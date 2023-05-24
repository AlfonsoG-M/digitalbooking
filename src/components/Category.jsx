import React, { useContext } from 'react'
import ProductCard from './ProductCard'
import style from '../styles/recomendation.module.css'
import { ContextGlobal } from './utils/global.context'

const { state:{ ProductosR }} = useContext(ContextGlobal)

const Category = () => {
  return (
    <div className={style.containerReco}>
        <h3 className={style.recoTitle}>{TITULO CATEGORIA}</h3>
        <div className={style.containerCards}>
        {ProductosR?.map( (producto) => <ProductCard key={producto.id} data={producto}/>)}
        </div>
    </div>
  )
}

export default Category