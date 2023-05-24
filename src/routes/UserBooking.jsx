import React from 'react'
import style from "../styles/userBooking.module.css"
import Headers from '../components/Headers'
import ReservationCards from '../components/ReservationCards'
import { Link } from 'react-router-dom'

const UserBooking = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={style.divContainerAll}>
      <Headers/>
      <div className={style.divReservation}>
        { 
          user.reservas == ![] ?
          <div className={style.cardDiv}>
            <i className="fa-solid fa-hotel"></i>
            <p className={style.p2}>Aún no has efectuado ninguna reserva</p>
            <Link to={"/"}>
              <button>ok</button>
             </Link>
          </div> : 
          user.reservas?.map((reservation, index) => <ReservationCards key={index} reservationData={reservation}/>)
        }
      </div>
    </div>
  )
}

export default UserBooking