import React from 'react'
import style from "../styles/successfulBooking.module.css"
import { Link, useNavigate } from 'react-router-dom'

const SuccessfulProductCreation = ({setSuccessful}) => {

    const navigate = useNavigate();

    const handleReserva = () => {
        setSuccessful(false)
        navigate("/")
      }

  return (
    <div className={style.container}>
      <div className={style.cardDiv}>
        <i className="fa-solid fa-circle-check"></i>
        <p className={style.p2}>Tu propiedad se ha creado con éxito</p>
        <Link to={"/"}>
          <button onClick={handleReserva}>ok</button>
        </Link>
      </div>
    </div>
  )
}

export default SuccessfulProductCreation