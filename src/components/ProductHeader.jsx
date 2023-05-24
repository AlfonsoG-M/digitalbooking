import React, {useState, useEffect, useContext} from 'react'
import { ContextGlobal } from './utils/global.context'
import style from "../styles/productHeader.module.css"
import { Link, useLocation } from 'react-router-dom'

const Header = ({estadoHeader}) => {

  const location = useLocation();

  const { state:{ProductoE, CategoriaPE} } = useContext(ContextGlobal)

  return (
    <div className={style.container}>
        <div className={style.title}>
            <p>{CategoriaPE?.titulo}</p>
            <h2>{estadoHeader?.titulo}</h2>
        </div>
        {
          !isNaN(location.pathname.slice(-1)) ?
          <Link className={style.link} to={"/"}>
            <i className="fa-solid fa-chevron-left"></i>
          </Link> : 
          <Link className={style.link} to={`/producto/${ProductoE?.id}`}>
            <i className="fa-solid fa-chevron-left"></i>
          </Link>
        }
    </div>
  )
  
}

export default Header