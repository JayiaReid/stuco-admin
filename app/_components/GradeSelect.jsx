"use client"

import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi'

const GradeSelect = ({selectedGrade}) => {
    const [grades, setGrades] = useState([])

    const getGradesList = ()=>{
        GlobalApi.GetGrades().then(res=>{
            console.log(res.data)
            setGrades(res.data)
        })
      }

      useEffect(()=>{
        getGradesList()
      }, [])
    return (
        <div>
            <select className="p-2 border rounded-lg bg-transparent" name="grade" onChange={(e)=>selectedGrade(e.target.value)}>
                {/* // value={student.grade} */}
                {/* onChange={handleChange}> */}
                <option className='text-slate-800' value={null}>Select Grade</option>
                {grades.map((grade, index) => (
                    <option className='text-slate-800' key={index} value={grade.grade}>{grade.grade}</option>
                ))}
            </select>
        </div>
    )
}

export default GradeSelect