import React from 'react'
import Header from '../components/header/Header'
import CartMenu from '../components/cartmenu/CartMenu.jsx'   
import "../pages/eccomerce.css"
import Section1 from '../components/sections/section1/Section1'
import Section2 from '../components/sections/section2/Section2'
import Section3 from '../components/sections/section3/Section3'

const Eccomerce = () => {
  return (
    <div className='all-eccomerce-container'>
      <CartMenu />  
      <Header />
      <hr className='hr1'/>
      <Section1/>

      <hr className='hr1'/>
      <Section2/>

      <hr className='hr1'/>
      <Section3/>
    </div>
  )
}

export default Eccomerce
