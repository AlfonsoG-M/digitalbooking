import React, { useState, useEffect, useContext } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import iconCalendar from '../assets/media/calendar.svg'
import style from '../styles/inputDate.module.css'
import '../styles/calendar.css';
import { ContextGlobal } from './utils/global.context';

const InputDate = ({handleDate}) => {

  const { state:{ SelectedDateRange }, dispatch } = useContext(ContextGlobal)

  const  [width, setWidth] = useState(window.innerWidth)
  const widthScreen = () => {
    setWidth(window.innerWidth);
  };

  useEffect (() => {
    window.addEventListener('resize', widthScreen);
    return () =>{ window.removeEventListener('resize', widthScreen)};
  })

  const handleOpenClose = () =>{
    setIsOpen(false)
    handleDate(dateRange)      
  }
      
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  registerLocale("es", es);

  return (
    <div className={style.datePickerContainer}>
    <img src={iconCalendar} className={style.icon} />
    <DatePicker 
      popperClassName={style.datePicker}
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      monthsShown={width < 
        481 ? 1 : 2}  
      dateFormat="dd/MM/yyyy"
      placeholderText="Check in - Check out"
      onChange={(selectedDate) => {
        setDateRange(selectedDate);        
      }}
      locale="es"
      shouldCloseOnSelect={false}
      onInputClick={() => setIsOpen(true)}
      open={isOpen}
      onClickOutside={() => setIsOpen(false)}
      showDisabledMonthNavigation
      onCalendarClose={() => handleDate(dateRange)}      
    >
    <button className={style.button} type="button" onClick={() => handleOpenClose()}>Aplicar</button>
     </DatePicker>
       </div>
  );
};

export default InputDate;
