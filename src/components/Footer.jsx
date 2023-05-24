import React from 'react';
import style from '../styles/footer.module.css'


const Footer = () => {
  return (
    <footer title='footer'>
      <div className={style.container}>
        <div>
          <p>©2023 Digital Booking</p>
        </div>
        <div className={style.icons}>
          <a href="" rel="noreferrer" target="_blank"><i title='icon' className="fa-brands fa-facebook"></i></a>
          <a href="" rel="noreferrer" target="_blank"><i title='icon' className="fa-brands fa-linkedin"></i></a>
          <a href="" rel="noreferrer" target="_blank"><i title='icon' className="fa-brands fa-twitter"></i></a>
          <a href="" rel="noreferrer" target="_blank"><i title='icon' className="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer