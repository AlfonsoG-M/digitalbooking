import React, {useEffect, useContext} from 'react'
import { ContextGlobal } from '../components/utils/global.context'
import style from "../styles/favs.module.css"
import { getLocaStorageFavs } from '../components/utils/usefulFunctions'
import ProductCard from "../components/ProductCard"
import Headers from '../components/Headers'
import { Link } from 'react-router-dom'

const Favs = () => {

    const {state:{fav, favs}, dispatch} = useContext(ContextGlobal);

    useEffect(()=>{
        const favs = getLocaStorageFavs();
        dispatch({type: "FAVS", payload: favs})
    },[dispatch, fav])

  return (
    <div className={style.divContainerAll}>
      <Headers/>
        <div className={style.divContainerFavs}>
            {
              favs == ![] ?
                <div className={style.cardDiv}>
                  <i className="fa-solid fa-heart-crack"></i>
                  <p className={style.p2}>No tienes alojamientos guardados en favoritos</p>
                  <Link to={"/"}>
                    <button>ok</button>
                  </Link>
                </div> :
                favs.map( (product, index) => <ProductCard key={product.titulo + index} data={product}/>)
            }
        </div>
    </div>
  )
}

export default Favs