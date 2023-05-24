import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import style from "../styles/bookingProductCard.module.css";
import { ContextGlobal } from "./utils/global.context";
import axios from "axios";

const BookingProductCard = ({dateRange, handleInfoUser}) => {
  
  const { state: { ProductoE, ImagenesPE }, dispatch } = useContext(ContextGlobal);

  const { id } = useParams();

  const url = "http://3.141.200.56:8080/api/";

  const getData = () => {
    axios
      .get(`${url}productos/${id}`)
      .then((res) => {
        dispatch({type: "PRODUCTOE", payload: res.data})
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    getData()
  },[ProductoE.id])

  return (
    <article className={style.container}>
      <h2>Detalle de la reserva</h2>
      <div className={style.containerCard}>
        <img src={ImagenesPE[0]?.urlImagen} alt={ImagenesPE[0]?.titulo} />
        <div className={style.infoCard}>
          <div className={style.infoHeader}>
            <p className={style.categoryTitle}>{ProductoE?.categoria?.titulo}</p>
            <h2>{ProductoE?.titulo}</h2>
            <span>★★★★★</span>
            <div className={style.locationDiv}>
              <i className="fa-solid fa-location-dot"></i>
              <p>{ProductoE?.ciudad?.nombre}, {ProductoE?.ciudad?.provincia}, {ProductoE?.ciudad?.pais}.</p>
            </div>
          </div>
          <hr />
          <div className={style.check}>
            <p>Check in</p>
            <p>{dateRange[0].slice(0,2) == "19" ? "__/__/__" : dateRange[0]}</p>
          </div>
          <hr />
          <div className={style.check}>
            <p>Check out</p>
            <p>{dateRange[1].slice(0,2) == "19" ? "__/__/__" : dateRange[1]}</p>
          </div>
          <hr />
          <button onClick={handleInfoUser} className={style.confirmarReserva}>Confirmar reserva</button>
        </div>
      </div>
    </article>
  );
};

export default BookingProductCard;
