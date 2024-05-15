// import { getUniqueRec } from '@/app/_services/unique'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GraduationCapIcon, TrendingDown, TrendingUp } from 'lucide-react'

const StatusList = ({ attendances, getUniqueRec}) => {

    const [totalStudents, setTotalStudents] = useState(0)
    const [perc, setPerc] = useState(0)
    const [date, setDate]=useState(new Date())


    useEffect(()=>{

        if(attendances){
            const total=getUniqueRec()
            setTotalStudents(total.length)

            const today = moment().format('D')
            // const today = 30;

            const Percentage = (attendances.length / (total.length*Number(today))* 100) ;

            setPerc(Percentage)
            // console.log(total)

        }
    }, [attendances])

    return (
        <div className='grid gap-5 my-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <Card icon={<GraduationCapIcon/>} title='Total Student' value={totalStudents} />
            <Card icon={<TrendingUp/>} title='Total Present (%)' value={perc.toFixed(1)} />
            <Card icon={<TrendingDown/>} title='Total Absent (%)' value={(100-perc).toFixed(1)} />
        </div>
    )
}

export default StatusList