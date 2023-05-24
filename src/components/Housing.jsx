import React, { useContext } from 'react'
import { ContextGlobal } from './utils/global.context';
import HousingCard from './HousingCard'
import style from '../styles/housing.module.css'


const Housing = () => {

  const { state:{Productos, Categorias} } = useContext(ContextGlobal)
  
  const filterCategoria = (data, tipoCategoria) => {
    const categoria = data?.filter(producto => producto.categoria?.titulo === tipoCategoria).length;
    return categoria;
  }
  
  const cantHotel = filterCategoria(Productos, "Hotel");
  const cantDepartamento = filterCategoria(Productos, "Departamento");
  const cantHostel = filterCategoria(Productos, "Hostel");
  const cantBedAndBreakfast = filterCategoria(Productos, "Bed and breakfast");

  return (
    <div className={style.containerList}>
      <h2>Buscar por tipo de alojamiento</h2>
      <div className={style.containerCards}>
        {Categorias.map((card) => {
          if(card.titulo == "Hotel"){
            return <HousingCard key={card.id} url={card.urlimagen} titulo={card.titulo} cantidad={cantHotel}/>
          }else if(card.titulo == "Departamento"){
            return <HousingCard key={card.id} url={card.urlimagen} titulo={card.titulo} cantidad={cantDepartamento}/>
          }else if(card.titulo == "Hostel"){
            return <HousingCard key={card.id} url={card.urlimagen} titulo={card.titulo} cantidad={cantHostel}/>
          }else{
            return <HousingCard key={card.id} url={card.urlimagen} titulo={card.titulo} cantidad={cantBedAndBreakfast}/>
          }
        })}
      </div>    
    </div>
  )
}

export default Housing