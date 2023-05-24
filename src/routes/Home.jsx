import React, { useContext, useEffect } from 'react'
import { ContextGlobal } from '../components/utils/global.context';
import axios from 'axios';
import style from '../styles/home.module.css'
import SearchSection from '../components/SearchSection';
import Housing from '../components/Housing';
import Recomendation from '../components/Recomendation';

const Home = () => {

  const { dispatch } = useContext(ContextGlobal)
  const url = "http://3.141.200.56:8080/api/"

  useEffect(() => {

    axios.get(`${url}ciudades`)
    .then(res => {
      dispatch({type: "CIUDADES", payload: res.data})
    })
    .catch(error => console.error("Error", error))

    axios.get(`${url}categorias`)
    .then(res => {
      dispatch({type: "CATEGORIAS", payload: res.data})
    })
    .catch(error => console.error("Error", error))

    axios.get(`${url}productos`)
    .then(res => {
      dispatch({type: "PRODUCTOS", payload: res.data})
    })
    .catch(error => console.error("Error", error))

    axios.get(`${url}productos/random`)
    .then(res => {
      dispatch({type: "PRODUCTOSR", payload: res.data})
    })
    .catch(error => console.error("Error", error))

  },[])

  return (
    <div className={style.home}>
      <SearchSection />
      <Housing />
      <Recomendation />
    </div>
  )
}

export default Home