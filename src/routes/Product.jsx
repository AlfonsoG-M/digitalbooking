import React, { useState, useEffect, useContext } from "react";
import style from "../styles/product.module.css";
import { ContextGlobal } from "../components/utils/global.context";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductHeader from "../components/ProductHeader";
import ProductLocation from "../components/ProductLocation";
import ProductImages from "../components/ProductImages";
import ProductDescription from "../components/ProductDescription";
import ProductCharacteristics from "../components/ProductCharacteristics";
import ProductPolicy from "../components/ProductPolicy";
import ProductBooking from "../components/ProductBooking";
import ProductMap from "../components/ProductMap";

const Product = () => {

  const { state:{Reservas},dispatch } = useContext(ContextGlobal)
  const [ showCarousel, setShowCarousel ] = useState(false);
  const [ estadoHeader, setEstadoHeader ] = useState();
  const { id } = useParams();

  const url = "http://3.141.200.56:8080/api/";

  const [position, setPosition] = useState()
  const [disabledDates, setDisabledDates] = useState([]);


  const getData = () => {
    axios
      .get(`${url}productos/${id}`)
      .then((res) => {
        dispatch({ type: "PRODUCTOE", payload: res.data });
        setPosition([res.data.latitud, res.data.longitud]);
        setEstadoHeader(res.data);
      })
      .catch((error) => console.error("Error", error));

      axios.get(`${url}reservas/producto/${id}`)
      .then((res) => {
      dispatch({type: "RESERVAS", payload: res.data})})
      .catch((error) => console.error("Error", error));
  };


  const generateArrayDisabledDates = ( arrayOfRanges ) => {
    let a = arrayOfRanges.map(range => {
      return generateDateArray(range.fechaInicial, range.fechaFinal);
    })
    setDisabledDates(a.flat())
  }

  const generateDateArray = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate + "T00:00:00");
    while (currentDate <= new Date(endDate + "T00:00:00")) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    generateArrayDisabledDates(Reservas);
  },[Reservas])


  useEffect(() => {
    getData();
  }, [id]);

  const handleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  return (
    <div className={style.product}>
      <ProductHeader estadoHeader={estadoHeader} />
      <ProductLocation />
      <ProductImages carousel={handleCarousel} />
      <ProductDescription />
      <ProductCharacteristics />
      <ProductBooking disabledDates={disabledDates}/>
      {position ? <ProductMap position={position} /> : null}
      <ProductPolicy />
    </div>
  );
};

export default Product;
