import React from 'react'
import style from "../styles/successfulBooking.module.css"
import { Link } from 'react-router-dom'

const SuccessfulBooking = ({setSuccessful}) => {

  const handleReserva = () => {
    setSuccessful(false)
  }

  return (
    <div className={style.container}>
      <div className={style.cardDiv}>
        <i className="fa-solid fa-circle-check"></i>
        <p className={style.p1}>¡Muchas gracias!</p>
        <p className={style.p2}>Su reserva se ha realizado con éxito</p>
        <Link to={"/"}>
          <button onClick={handleReserva}>ok</button>
        </Link>
      </div>
    </div>
  )
}

export default SuccessfulBooking