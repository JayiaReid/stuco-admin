"use client"
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelect from '@/app/_components/MonthSelect'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

const Attendance = () => {
    const [attendances, setAttendances]=useState([])
    const [selectedMonth, setselectedMonth] = useState(new Date())
    const [selectedGrade, setselectedGrade] = useState(new Date())

    const onSearchHandle =()=>{
        // console.log(selectedMonth, selectedGrade)

        const month = moment(selectedMonth).format('MM/YYYY')
        // console.log(month)
        GlobalApi.GetAttendance(selectedGrade,month).then(res=>{
            setAttendances(res.data)
            console.log(res.data)
        })
    }
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold'>Attendance</h2>
            {/* Search Option */}

            <div className='flex gap-4 p-5 my-5'>
                <div className='flex items-center gap-2'>
                    <label>Select Month: </label>
                    <MonthSelect selectedMonth={(value)=>setselectedMonth(value)} />
                </div>
                <div className='flex items-center gap-2'>
                    <label>Select Month: </label>
                    <GradeSelect selectedGrade={(v)=>setselectedGrade(v)} />
                </div>
                <Button onClick={()=>onSearchHandle()}>Search</Button>
            </div>

            {/* student attendance grid */}
            <AttendanceGrid selectedMonth={selectedMonth} attendances={attendances}/>
        </div>
    )
}

export default Attendance