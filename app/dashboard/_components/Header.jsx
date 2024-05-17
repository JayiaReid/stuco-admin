"use client"
import { useKindeAuth, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { ModeToggle } from './ModeToggle'
import { db2 } from '@/drizzle.config'
import GlobalApi from '@/app/_services/GlobalApi'
import { MenuIcon } from 'lucide-react'

const Header = ({showNav}) => {
    const {user} = useKindeBrowserClient();

    const getStats = ()=>{
      GlobalApi.GetStatistics().then(res => {
        console.log(res.data)})
    }

    useEffect(()=>{
      // getStats()
    })
  return (
    <div className='p-4 z-[2] bg-background shadow-md flex justify-between'>
        <div className='md:hidden sm:block cursor-pointer'>
          <MenuIcon xlinkTitle='show nav' onClick={()=>showNav(true)}/>
        </div>
        <div>
        <h1 className='font-bold text-xl'><span className='text-[#ffbf00]'>StuCo:</span><span className='text-[#54f7f8]'> Admin</span> <span className='text-primary'>Dashboard</span></h1>
        </div>
        <div>
          
            <Image src={user?.picture} width={35} height={35} alt="user" className="rounded-full"/>
        </div>
    </div>
  )
}

export default Header