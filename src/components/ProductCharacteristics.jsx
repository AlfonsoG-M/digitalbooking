import React, { useContext } from 'react'
import { ContextGlobal } from './utils/global.context'
import style from "../styles/productCharacteristics.module.css"
import CharacteristicsCard from './CharacteristicsCard'



const ProductCharacteristics = () => {

  const { state:{CaracteristicasPE} } = useContext(ContextGlobal);

  return (
    <div className={style.container}>
        <h2>¿Que ofrece este lugar?</h2>
        <hr />
        <div className={style.characteristicGrid}>
            {CaracteristicasPE?.map(data=><CharacteristicsCard key={data.id} nombre={data.nombre} icono={data.icono}/>)}
        </div>
    </div>
  )
}

export default ProductCharacteristics