"use client"
import GlobalApi from '@/app/_services/GlobalApi'
import { LoginLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LoaderIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AddSchool from './_components/AddSchool'
import SchoolList from './_components/SchoolList'

const Schools = () => {
  const[schools, setSchools]=useState([])

  useEffect(()=>{
    getSchools()
  }, [])

  const getSchools=()=>{
    GlobalApi.GetSchools().then(res=>{
      console.log(res.data)
      setSchools(res.data)
    })
  }

  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div className='flex h-screen items-center justify-center animate-spin'>
    <LoaderIcon />
  </div>

  return isAuthenticated? (
    <div className='p-7 z-[-1]'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Schools
        <AddSchool refreshData={getSchools}/></h2>
        <SchoolList refreshData={getSchools} schools={schools}/>
    </div>
  ) : (
    <div className='flex h-screen items-center justify-center'>
      <h2 className='text-lg text-foreground'> You have to <LoginLink>Login</LoginLink> to see this page </h2>
    </div>
  );
}

export default Schools