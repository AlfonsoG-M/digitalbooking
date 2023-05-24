import React from 'react'
import style from "../styles/characteristicsCard.module.css"

const CharacteristicsCard = ({nombre, icono}) => {

  return (
    <div className={style.container}>
        <i className={icono}></i>
        <p>{nombre}</p>
    </div>
  )
}

export default CharacteristicsCard