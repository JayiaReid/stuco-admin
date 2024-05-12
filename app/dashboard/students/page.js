"use client"
import React, { useEffect,useState} from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentList from './_components/StudentList'

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
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Students
        <AddNewStudent/></h2>
        <StudentList refreshData={getStudents} students={students}/>
    </div>
  )
}

export default Student