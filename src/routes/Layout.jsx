import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const Layout = () => {
 
  return (
    <div className='App'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout