import React from 'react'
import style from "../styles/userOptions.module.css"
import { useNavigate } from 'react-router-dom';


const UserOptions = () => {

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const userEmail = userInfo.email.slice(0,-19);

  const goReservas = () => {
    navigate(`/usuario/${userEmail}/reserva`)
  }

  const goFavs = () => {
    navigate(`/usuario/${userEmail}/favoritos`)
  }

  return (
    <div className={style.container}>
        <p onClick={goReservas} >Reservas</p>
        <p onClick={goFavs}>Favoritos</p>
    </div>
  )
}

export default UserOptions