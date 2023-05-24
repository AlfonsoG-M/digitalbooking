import axios from 'axios'
import React, { useContext } from 'react'
import { ContextGlobal } from './utils/global.context'
import style from '../styles/housingCard.module.css'

const HousingCard = ({titulo, cantidad, url}) => {


  const { state:{ ProductosF }, dispatch } = useContext(ContextGlobal)

  const renderRecomendations = () => {
    axios.get(`http://3.141.200.56:8080/api/productos/categoria/${titulo}`)
    .then(res => {
      dispatch({type: "PRODUCTOSF", payload: res.data})
    })
    .catch(error => console.error("Error", error))
  }

  return (
        <div onClick={renderRecomendations} className={style.container}>
            <img src={url}/>
            <div className={style.infoCard}>
              <h3>{titulo}</h3>
            <p>{cantidad} alojamientos</p>
            </div>
        </div>
  )
}

export default HousingCard