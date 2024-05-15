"use client"
import React, { useEffect,useState} from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentList from './_components/StudentList'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LoaderIcon } from 'lucide-react'

const Student = () => {

  const[students, setStudents]=useState([])

  useEffect(()=>{
    getStudents()
  }, [])

  const getStudents=()=>{
    GlobalApi.GetStudents().then(res=>{
      console.log(res.data)
      setStudents(res.data)
    })
  }

  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div className='flex h-screen items-center justify-center animate-spin'>
    <LoaderIcon />
  </div>

  return isAuthenticated? (
    <div className='p-7 z-[-1]'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Students
        <AddNewStudent refreshData={getStudents}/></h2>
        <StudentList refreshData={getStudents} students={students}/>
    </div>
  ) : (
    <div className='flex h-screen items-center justify-center'>
      <h2 className='text-lg text-foreground'> You have to <LoginLink>Login</LoginLink> to see this page </h2>
    </div>
  );
}

export default Student