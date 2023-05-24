import React, { useState } from "react";
import style from "../styles/time.module.css";

const Time = ({selectedOption, setSelectedOption}) => {
  

  const handleChange = (event) => {
    
    setSelectedOption(event.target.value);
  };


  return (
    <div className={style.containerTime}>
      <div className={style.checkDiv}>
        <i className="fa-regular fa-circle-check"/>
        <p>Tu habitación va a estar lista para el check-in entre las 10:00 y las 23:00.</p>
      </div>
      
      <label htmlFor="options">Indicá tu hora estimada de llegada</label>
      <select name="time" id="options" value={selectedOption} onChange={handleChange} required>
        <option value="" disabled>Seleccionar hora</option>
        <option value="0:00:00">0:00</option>
        <option value="1:00:00">1:00</option>
        <option value="2:00:00">2:00</option>
        <option value="3:00:00">3:00</option>
        <option value="4:00:00">4:00</option>
        <option value="5:00:00">5:00</option>
        <option value="6:00:00">6:00</option>
        <option value="7:00:00">7:00</option>
        <option value="8:00:00">8:00</option>
        <option value="9:00:00">9:00</option>
        <option value="10:00:00">10:00</option>
        <option value="11:00:00">11:00</option>
        <option value="12:00:00">12:00</option>
        <option value="13:00:00">13:00</option>
        <option value="14:00:00">14:00</option>
        <option value="15:00:00">15:00</option>
        <option value="16:00:00">16:00</option>
        <option value="17:00:00">17:00</option>
        <option value="18:00:00">18:00</option>
        <option value="19:00:00">19:00</option>
        <option value="20:00:00">20:00</option>
        <option value="21:00:00">21:00</option>
        <option value="22:00:00">22:00</option>
        <option value="23:00:00">23:00</option>
      </select>
    </div>
  );
};
export default Time;
