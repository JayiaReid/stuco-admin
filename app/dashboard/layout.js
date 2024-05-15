"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'

const layout = ({children}) => {

  const [nav, showNav]=useState(false)

  return (
    <div>
      <div className='md:w-64 fixed xs:hidden sm:hidden md:block'>
        <SideNav/>
      </div>
      {
        nav && 
        <div className='w-full fixed block md:hidden'>
        <SideNav showNav={showNav}/>
        </div>
      }
      <div className='md:ml-64'>
        <Header showNav={showNav}/>
        {nav===false && children}
      </div>
      </div>
  )
}

export default layout