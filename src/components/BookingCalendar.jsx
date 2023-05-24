import React, {useEffect, useState} from 'react'
import DatePicker, {registerLocale} from 'react-datepicker';
import es from "date-fns/locale/es";
import style from "../styles/booking.module.css";
import 'react-datepicker/dist/react-datepicker.css';

const BookingCalendar = ({width, handleDate, disabledDates, arrayReservas}) => {

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    registerLocale("es", es);

    useEffect(() => {
        handleDate(dateRange)
    },[dateRange])


  return (
    <DatePicker
        calendarClassName="bookingCalendar-container booking"
        popperClassName={style.datePicker}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        monthsShown={width > 900 ? 3 : width < 650 ? 1 : 2}
        dateFormat="yyyy/MM/dd"
        placeholderText="Check in - Check out"
        excludeDates= {disabledDates}
        onChange={(selectedDate) => {
            if (arrayReservas.length != 0){
                for(let i = 0; i < arrayReservas.length; i++){
                    console.log(arrayReservas[i])
                    if(selectedDate[0] < new Date(arrayReservas[i][0]) &&
                    selectedDate[1] > new Date(arrayReservas[i][1])){
                        return setDateRange([null, null])
                    } else {
                        setDateRange(selectedDate);
                    }
                }
            } else{
                setDateRange(selectedDate) 
            }
        }}
        locale="es"
        inline
        showDisabledMonthNavigation
    />
  )
}

export default BookingCalendar