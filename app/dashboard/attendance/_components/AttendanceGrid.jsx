import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import '../../../ag-grid-theme-builder.css'
import '../../../ag-grid-theme-builder (1).css'
import '../../../ag-grid-theme-builder-system.css'
import { useTheme } from 'next-themes';
import moment from 'moment';

const AttendanceGrid = ({attendances, selectedMonth}) => {

    const {theme}=useTheme()
    // const [initialRender, setInitialRender] = useState(true);
    const [rows, setrows] = useState()
    const [cols, setcols] = useState([
        // {field: "present"},
        // {field: "attendanceID"},
        {field: "stud_ID"},
        {field: "fname"},
        {field: "lname"},
        // {field: "grade"},
        // {field: "day"},
        // {field: "date"},
    ])

    const DaysInMonth = (year, month)=>new Date(year, month +1, 0).getDate()
    const numberOfDays=DaysInMonth(moment(selectedMonth).format('YYYY'), moment(selectedMonth).format('MM'))
    const arrayOfDays=Array.from({length: numberOfDays},(_,i)=>i+1)
    // console.log(arrayOfDays)

    useEffect(()=>{
        if (attendances) {
            const userList=getUniqueRec();
            setrows(userList)
            console.log(userList)

            arrayOfDays.forEach((date)=>(
                setcols(prev=>[...prev, {
                    field: date.toString(), width:50, editable:true
                }])
            ))
        }
    }, [attendances])

// distinct
    const getUniqueRec=()=>{
        const unique=[]
        const existingUser = new Set();

        attendances?.forEach(record => {
            if(!existingUser.has(record.stud_ID)){
                existingUser.add(record.stud_ID)
                unique.push(record)
            } 
        });
        return unique;
    }

    const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [25, 50, 100];

  return (
    <div>
        <div
        className={`ag-theme-custom-${theme}`}
        style={{ height: 500 }}
      >
        <h2>{theme}</h2>
          <AgGridReact
            rowData={rows}
            columnDefs={cols}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
      </div>

    </div>
  )
}

export default AttendanceGrid