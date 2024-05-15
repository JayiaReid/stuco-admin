"use client"
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelect from '@/app/_components/MonthSelect'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'
import { LoginLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LoaderIcon } from 'lucide-react'
import SchoolSelect from '@/app/_components/SchoolSelect'

const Attendance = () => {
    const [attendances, setAttendances]=useState([])
    const [selectedMonth, setselectedMonth] = useState(new Date())
    const [selectedGrade, setselectedGrade] = useState()
    const [selectedSchool, setSelectedSchool]=useState()

    const onSearchHandle =()=>{
        // console.log(selectedMonth, selectedGrade)

        const month = moment(selectedMonth).format('MM/YYYY')
        // console.log(month)
        GlobalApi.GetAttendanceBySchool(selectedGrade, month, selectedSchool).then(res=>{
            setAttendances(res.data)
            console.log(res.data)
        })
    }

    const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div className='flex h-screen items-center justify-center animate-spin'>
    <LoaderIcon />
  </div>

  return isAuthenticated? (
        <div className='p-10'>
            <h2 className='text-2xl font-bold'>Attendance</h2>
            {/* Search Option */}

            <div className='sm:flex-col flex-row flex md:flex-col gap-4 p-5 my-5'>
                <div className='flex items-center gap-2'>
                    <label>Select Month: </label>
                    <MonthSelect selectedMonth={(value)=>setselectedMonth(value)} />
                </div>
                <div className='flex items-center gap-2'>
                    <label>Select School: </label>
                    <SchoolSelect selectedSchool={(val)=>setSelectedSchool(val)} />
                </div>
                <div className='flex items-center gap-2'>
                    <label>Select Grade: </label>
                    <GradeSelect selectedGrade={(v)=>setselectedGrade(v)} />
                </div>
                <Button onClick={()=>onSearchHandle()}>Search</Button>
            </div>

            {/* student attendance grid */}
            <AttendanceGrid selectedMonth={selectedMonth} attendances={attendances}/>
        </div>
    ) : (
        <div className='flex h-screen items-center justify-center '>
          <h2 className='text-lg text-foreground'> You have to <LoginLink>Login</LoginLink> to see this page </h2>
        </div>
      );
}

export default Attendance