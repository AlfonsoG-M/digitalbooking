import React, { useContext, useState, useEffect, useRef } from "react";
import { ContextGlobal } from "../components/utils/global.context";
import { useParams} from "react-router-dom";
import axios from "axios";
import style from "../styles/booking.module.css";
import SuccessfulBooking from "../components/SuccessfulBooking";
import ProductHeader from "../components/ProductHeader";
import BookingUserData from "../components/BookingUserData";
import Time from "../components/Time";
import ProductPolicy from "../components/ProductPolicy"
import BookingProductCard from "../components/BookingProductCard";
import BookingCalendar from "../components/BookingCalendar";


const Booking = () => {

  

  const { id } = useParams();
  const { state: { ProductoE, Reservas, user}, dispatch } = useContext(ContextGlobal);
  const [reservas, setReservas] = useState()
  const [selectedOption, setSelectedOption] = useState("");
  /* const [usuario , setUsuario ] = useState() */
  const usuario = JSON.parse(localStorage.getItem("user"));

  
  /* const [usuario , setUsuario ] = useState()
  !user ? localStorage.getItem("user") : user
  useEffect(() => {
    setUsuario(JSON.parse(localStorage.getItem("user")))
  },[]) */


  const [disabledDates, setDisabledDates] = useState();
  const [userInfo, setUserInfo] = useState({
    fechaInicial: "",
    fechaFinal: "",
    horaInicio: "",
    productoId: 0,
    usuarioId: usuario?.id
  })

  const url = "http://3.141.200.56:8080/api/";

  const getData = () => {
    axios.get(`${url}productos/${id}`)
    .then((res) => {
      dispatch({type: "PRODUCTOE", payload: res.data})
    })
    .catch((error) => console.error("Error", error));

    axios.get(`${url}reservas/producto/${id}`)
    .then((res) => {
      setReservas(res.data)
      dispatch({type: "RESERVAS", payload: res.data})
    })
    .catch((error) => console.error("Error", error));
  };


  const generateArrayDisabledDates = ( arrayOfRanges ) => {
    let a = arrayOfRanges.map(range => { 
      return generateDateArray(range.fechaInicial, range.fechaFinal);
    })
    setDisabledDates(a.flat())
  }
  const dates = [];
  const [arrayReservas , setArrayReservas] = useState([])
  const generateDateArray = (startDate, endDate) => {
    setArrayReservas(arrayReservas => [...arrayReservas, [startDate, endDate]])
    const currentDate = new Date(startDate + "T00:00:00");
    while (currentDate <= new Date(endDate + "T00:00:00")) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    getData()
  },[])


  const divWidth = useRef(null)
  const [width, setWidth] = useState();
  const [shouldUpdateWidth, setShouldUpdateWidth] = useState(true);
  const [dateRange, setDateRange] = useState(["", ""])

  useEffect(() => {
    generateArrayDisabledDates(Reservas);
  },[Reservas])
  
  const handleDatePicker = (range) => {
    range = range.map(date => new Date(date).toISOString().split('T')[0])
    setDateRange(range)    
    dispatch({type: "SELECTEDDATERANGE", payload: range})

    const hours = range.map(date => new Date(date).toISOString().split('T')[1])
    setUserInfo({
      fechaInicial: range[0],
      fechaFinal: range[1],
      horaInicio: hours[0].slice(0,-2),
      productoId: Number(id),
      usuarioId: usuario?.id
    })
  }

  const [successful , setSuccessful] = useState(false)

  const handleInfoUser = () => {
    axios.post(`${url}reservas`, userInfo, {headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }})
    .then((res) => {
      setSuccessful(true)
      axios.get(`http://3.141.200.56:8080/api/usuarios/datos/${user.email}`)
      .then(res => { 
        localStorage.setItem("user", JSON.stringify({
          id: res.data.id,
          nombre: res.data.nombre,
          apellido: res.data.apellido,
          email: res.data.email,
          password: res.data.password,
          ciudad: res.data.ciudad,
          rolId: res.data.rol.id,
          reservas: res.data.reservas
        }))
        dispatch({ type: "USER", payload : {
          id: res.data.id,
          nombre: res.data.nombre,
          apellido: res.data.apellido,
          email: res.data.email,
          password: res.data.password,
          ciudad: res.data.ciudad,
          rolId: res.data.rol.id,
          reservas: res.data.reservas
        }})
      })
    })
    .catch((error) => console.error("Error", error));
  }

  useEffect(() => {
    const handleResize = () => setShouldUpdateWidth(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

  useEffect(() => {
    if(shouldUpdateWidth){
      const width = divWidth.current.offsetWidth;
      setWidth(width)
      setShouldUpdateWidth(false);
    }
  },[shouldUpdateWidth]);

  return (
    <div className={style.bookingContainer}>
      {successful ? <SuccessfulBooking setSuccessful={setSuccessful} /> : null}
      <ProductHeader estadoHeader={ProductoE}/>

      <h2>Completá tus datos</h2>

      <div className={style.bookingZone}>
        
        <div className={style.bookingLeftZone}>
          <BookingUserData/>
          <h2>Seleccioná tu fecha de reserva</h2>
          <div ref={divWidth}>
            <BookingCalendar width={width} handleDate={handleDatePicker} disabledDates={disabledDates} arrayReservas= {arrayReservas}/>
          </div>
          <h2>Tu horario de llegada</h2>
          <Time selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        </div>

        <div className={style.bookingRightZone}>
          <BookingProductCard dateRange={dateRange} handleInfoUser={handleInfoUser}/>
        </div>

      </div>
      <ProductPolicy/>
    </div>
  );
};

export default Booking;