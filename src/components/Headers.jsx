import React from "react";
import style from "../styles/reservationHeader.module.css";
import { Link, useLocation } from "react-router-dom";

const ReservationHeader = () => {
  const location = useLocation();

  const getTittle = (locationPath) => {

    if(locationPath.slice(-7) === "reserva"){
      return "Mis reservas";
    }else if(locationPath.slice(-9) === "favoritos"){
      return "Mis favoritos"
    }else{
      return "Administración"
    }
  
  }

  return (
    <div className={style.container}>
      <h1>{getTittle(location.pathname)}</h1>
      <Link className={style.link} to={"/"}>
        <i className="fa-solid fa-chevron-left"></i>
      </Link>
    </div>
  );
};

export default ReservationHeader;
