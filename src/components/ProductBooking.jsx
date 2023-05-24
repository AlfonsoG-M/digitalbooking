import React, { useState, useEffect, useContext } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ContextGlobal } from "./utils/global.context";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import style from "../styles/productBooking.module.css";
import "../styles/calendar.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const ProductCalendar = ({disabledDates}) => {

  /* const { state:{isLogged}} = useContext(ContextGlobal); */
  const navigate = useNavigate()
  const { id } = useParams();
  const { pathname } = useLocation();

  const [width, setWidth] = useState(window.innerWidth);
  const widthScreen = () => {
    setWidth(window.innerWidth);
  };

  const handleProductBooking = () => {
    if(!localStorage.getItem("token")){
      navigate("/iniciar-sesion", {
        state:{
          previousPath: pathname
        }
      })
    } else {
      navigate(`/producto/${id}/reserva`);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", widthScreen);
    return () => {
      window.removeEventListener("resize", widthScreen);
    };
  });

  registerLocale("es", es);

  return (
    <div className={style.productCalendarContainer}>
      <h2>Fechas disponibles</h2>
      <div className={style.container}>
        <DatePicker
          calendarClassName="bookingCalendar-container"
          locale="es"
          dateFormat="dd/MM/yyyy"
          excludeDates={disabledDates}
          minDate={new Date()}
          forceShowMonthNavigation
          monthsShown={width < 800 ? 1 : 2}
          inline
        />
        <div className={style.bookingContainer}>
          <p>Agregá tus fechas de viaje para obtener precios exactos</p>
          <a onClick={handleProductBooking}>
            <button className={style.button}>Iniciar reserva</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCalendar;
