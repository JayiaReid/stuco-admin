import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import '../../../ag-grid-theme-builder.css'
import '../../../ag-grid-theme-builder (1).css'
import '../../../ag-grid-theme-builder-system.css'
import { useTheme } from 'next-themes';
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const AttendanceGrid = ({ attendances, selectedMonth }) => {

    const { theme } = useTheme()
    // const [initialRender, setInitialRender] = useState(true);
    const [rows, setrows] = useState()
    const [cols, setcols] = useState([
        // {field: "present"},
        // {field: "attendanceID"},
        { field: "stud_ID" },
        { field: "fname" },
        { field: "lname" },
        // {field: "grade"},
        // {field: "day"},
        // {field: "date"},
    ])

    // const [temp, settemp]=useState(0)

    const DaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
    const numberOfDays = DaysInMonth(moment(selectedMonth).format('YYYY'), moment(selectedMonth).format('MM'))
    const arrayOfDays = Array.from({ length: numberOfDays }, (_, i) => i + 1)
    // console.log(arrayOfDays)

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

    useEffect(() => {
        if (attendances) {
            const userList = getUniqueRec();
            setrows(userList);

            // Dynamically generate columns for each day
            const newCols = [
                { field: "stud_ID",filter: true  },
                { field: "fname", filter: true  },
                { field: "lname", filter: true }
            ];

            arrayOfDays.forEach((date) => {
                newCols.push({ field: date.toString(), width: 50, editable: true });


                userList.forEach((element) => {
                    element[date] = isPresent(element.stud_ID, date);
                });
            });


            setcols(newCols);
        }
    }, [attendances]);

    const isPresent = (stud_ID, day)=>{
        const result = attendances.find(item=>item.day==day&&item.stud_ID==stud_ID)
        return result?true: false
    }

    const onAttendanceChange = (e, day, stud_ID, present, attendanceId)=>{

        // console.log(e)

        const date = moment(selectedMonth).format('MM/yyyy')

        if(present){
            const data = {
                day: day,
                stud_ID: stud_ID,
                present: present,
                date: date
            }

            GlobalApi.UpdateAttendance(data).then(res => {
                // console.log(res.data);
                toast(res.data[0].insertId+ ": " + stud_ID + ' marked present');
            })
            .catch(err => {
                console.error('Error updating attendance:', err);
            });
        }
        else{
            
            GlobalApi.absentMark(stud_ID, day, date).then(res=>{
                // console.log(res.data)
                toast( stud_ID + ' marked absent');
            })
        }
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
                {/* <h2>{theme}</h2> */}
                <AgGridReact
                    onCellValueChanged={(e)=>onAttendanceChange(e, e.colDef.field, e.data.stud_ID, e.newValue, e.data.attendanceID)}
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