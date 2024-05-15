const { default: axios } = require("axios");

const GetGrades=()=>axios.get('/api/grade')
const GetSchools=()=>axios.get('/api/school')
const createStudent=(data)=>axios.post('/api/student',data)
const GetStudents=()=>axios.get('/api/student')
const deleteStudent=(userID)=>axios.delete('/api/student?userID='+userID)
const GetAttendance=(grade, month)=>axios.get('/api/attendance?grade='+grade+'&month='+month)
const UpdateAttendance=(data)=>axios.post('/api/attendance', data)
const absentMark=(stud_ID, day, date)=>axios.delete('/api/attendance?stud_ID='+stud_ID+'&day='+day+'&date='+date)
const totalCountByDay=(date, grade, sch_ID)=>axios.get('/api/dashboard?date='+date+'&grade='+grade+'&sch_ID='+sch_ID)
const totalCountByMonth=(grade, month, sch_ID)=>axios.get('/api/dasboard2?grade='+grade+'&month='+month+'&sch_ID='+sch_ID)
const GetStatistics = () =>axios.get('/api/studystats')
const GetAttendanceBySchool = (grade, month, sch_ID) =>axios.get('/api/attendance2?grade='+grade+'&month='+month+'&sch_ID='+sch_ID)

export default{
    GetAttendanceBySchool,
    GetStatistics,
    totalCountByMonth,
    totalCountByDay,
    GetGrades,
    GetSchools,
    createStudent,
    GetStudents,
    deleteStudent,
    GetAttendance,
    UpdateAttendance,
    absentMark
}