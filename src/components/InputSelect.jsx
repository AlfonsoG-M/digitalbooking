import React, { useState, useEffect, useContext } from 'react'
import { ContextGlobal } from './utils/global.context'
import style from '../styles/inputSelect.module.css'
import iconLocation from '../assets/media/location.svg'
import iconLocationSecondary from '../assets/media/location-secondary.svg'

const InputSelect = () => {

    const { state:{Ciudades}, dispatch } = useContext(ContextGlobal)

    const [selectedCity, setSelectedCity] = useState("¿A dónde vamos?");
    const [dropDownVisibility, setDropDownVisibility] = useState(" ")

    const showDropDown = () => {
        if (dropDownVisibility === " ")
            setDropDownVisibility("show")
        if (dropDownVisibility === "show")
            setDropDownVisibility(" ")
    };

    const handleChange = (e) => {
        setSelectedCity(e.target.innerText)
        dispatch({type: "SELECTEDCITY", payload: e.target.title})        
        showDropDown();
    };

    return (
        <>
            <div className={style.inputCity} onClick={showDropDown}>{selectedCity}
            <img src={iconLocation} className={style.icon} />
            
            <div className={`${style.dropdownContainer} ${style[dropDownVisibility]}`} >
                {Ciudades.map((city) => {
                    return (
                        <div key={city.id} onClick={handleChange}>
                            <img src={iconLocationSecondary} className={style.dropDownIcon} />
                            <span className={style.dropDownCityName} title={city.nombre}>
                                {city.nombre}
                                <span className={style.dropDownCountryName}>
                                    {city.pais}
                                </span>
                            </span>
                        </div>
                    );
                })}
            </div>
            </div>
        </>
    )
}

export default InputSelect
