"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GraduationCapIcon, HandIcon, LayoutIcon, SettingsIcon } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { usePathname } from 'next/navigation'

const SideNav = () => {

    const {user} = useKindeBrowserClient();

    const path = usePathname()
    useEffect(()=>{
        console.log(path)
    })

    const menu = [
       {
        id:1,
        name: "Dashboard",
        icon:LayoutIcon,
        path:'/dashboard'
       },
       {
        id:2,
        name: "Students",
        icon:GraduationCapIcon,
        path:'/dashboard/students'
       },
       {
        id:3,
        name: "Attendance",
        icon:HandIcon,
        path:'/dashboard/attendance'
       },
       {
        id:4,
        name: "Settings",
        icon:SettingsIcon,
        path:'/dashboard/settings'
       }
    ]

  return (
    <div className='border shadow-md h-screen p-5'>
        <Image src={'/education.png'} width={180} height={50} alt='logo'/>

        <hr className='my-5'/>

        {menu.map((item, index)=>(
            <Link key={index} href={item.path}>
                <h2 
                className={`${path==item.path&& 'bg-primary text-white'} flex items-center gap-3 text-md p-4 hover:bg-primary hover:text-primary-foreground my-2 rounded-lg cursor-pointer text-slate-500`}>
                    <item.icon/>
                    {item.name}
                </h2>
            </Link>
            
        ))}

        <div className='p-4 bottom-5 fixed flex gap-2 items-center'>
            <Image src={user?.picture} width={35} height={35} alt='user' className='rounded-full'/>
            <div>
                <h2 className='text-sm font-bold '>{user?.given_name} {user?.family_name}</h2>
                <h2 className='text-xs text-slate-400'>{user?.email}</h2>
            </div>
        </div>
    </div>
  )
}

export default SideNav