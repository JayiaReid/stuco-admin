"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import GradeSelect from '../_components/GradeSelect'
import MonthSelect from '../_components/MonthSelect'
import GlobalApi from '../_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'
import BarChart from './_components/BarChart'
import LineChartComponent from './_components/LineChart'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LoaderIcon } from 'lucide-react'
import SchoolSelect from '../_components/SchoolSelect'

const Dashboard = () => {
  const { setTheme } = useTheme()
  const [attendances, setAttendances] = useState([])

  const [selectedMonth, setselectedMonth] = useState(new Date())
  const [selectedGrade, setselectedGrade] = useState('')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [totalPresentData, setTotalPresentData] = useState([])
  const [monthData, setMonthData] = useState([])

  useEffect(() => {
    setTheme("system")
  }, [])

  useEffect(() => {
    fetchData(selectedMonth, selectedGrade, selectedSchool);
    console.log(selectedSchool)
  }, [selectedMonth, selectedGrade])

  const fetchData = (month, grade, sch_ID) => {
    GlobalApi.totalCountByDay(moment(month).format('MM/yyyy'), grade, sch_ID)
      .then(res => {
        setTotalPresentData(res.data);
      })
    GlobalApi.GetAttendanceBySchool(grade, moment(month).format('MM/yyyy'), sch_ID)
      .then(res => {
        setAttendances(res.data);
        console.log(res.data)
      })
    GlobalApi.totalCountByMonth(grade, moment(month).format('MM/yyyy'), sch_ID)
      .then(res => {
        console.log(res.data)
        setMonthData(res.data)
      })
  }

  const getUniqueRec = () => {
    const unique = []
    const existingUser = new Set();

    attendances?.forEach(record => {
      if (!existingUser.has(record.stud_ID)) {
        existingUser.add(record.stud_ID)
        unique.push(record)
      }
    });
    return unique;
  }

  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div className='flex h-screen items-center justify-center animate-spin'>
    <LoaderIcon />
  </div>
  
  return isAuthenticated ? (
    <div className='p-10'>
      <div className='flex gap-5 sm:flex-col justify-between items-center'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <div className='flex items-center gap-4'>
          <SchoolSelect selectedSchool={(val)=>setSelectedSchool(val)}/>
          <GradeSelect selectedGrade={(v) => setselectedGrade(v)} />
          <MonthSelect selectedMonth={(value) => setselectedMonth(value)} />
        </div>
      </div>

      <div>
        {/* <h2 className='text-forground my-3 text-center font-italic text-lg'>Attendance</h2> */}
        <StatusList getUniqueRec={getUniqueRec} attendances={attendances} />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='z-[-1]'>
            <BarChart getUniqueRec={getUniqueRec} attendances={attendances} totalPresentData={totalPresentData} />
          </div>
          <div className='z-[-1] md:col-span-2'>
            <LineChartComponent monthData={monthData} getUniqueRec={getUniqueRec} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex h-screen items-center justify-center'>
      <h2 className='text-lg text-foreground'> You have to <LoginLink>Login</LoginLink> to see this page </h2>
    </div>
  );
}

export default Dashboard
