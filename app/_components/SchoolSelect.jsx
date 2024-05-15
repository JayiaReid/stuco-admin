import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi'

const SchoolSelect = ({selectedSchool}) => {

    const [schools, setSchools]=useState([])

    const getSchools = ()=>{
        GlobalApi.GetSchools().then(res=>{
            // console.log(res.data)
            setSchools(res.data)
        })
      }

      useEffect(()=>{
        getSchools()
      }, [])

  return (
    <div>
        <div>
            <select className="p-2 border rounded-lg bg-transparent" name="grade" onChange={(e)=>selectedSchool(e.target.value)}>
                <option className='text-slate-800' value={null}>Select School</option>
                {schools.map((school, index) => (
                    <option className='text-slate-800' key={index} value={school.sch_ID}>{school.sch_name}</option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default SchoolSelect