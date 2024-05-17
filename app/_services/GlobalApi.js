const { default: axios } = require("axios");

const GetGrades=()=>axios.get('/api/grade')
const GetLevels = ()=>axios.get('/api/levels')
const GetSchools=()=>axios.get('/api/school')
const createStudent=(data)=>axios.post('/api/student',data)
const GetStudents=()=>axios.get('/api/student')
const deleteStudent=(userID)=>axios.delete('/api/student?userID='+userID)
const deleteSchool=(sch_ID)=>axios.delete('/api/school?sch_ID='+sch_ID)
const GetAttendance=(grade, month)=>axios.get('/api/attendance?grade='+grade+'&month='+month)
const UpdateAttendance=(data)=>axios.post('/api/attendance', data)
const absentMark=(stud_ID, day, date)=>axios.delete('/api/attendance?stud_ID='+stud_ID+'&day='+day+'&date='+date)
const totalCountByDay=(date, grade, sch_ID)=>axios.get('/api/dashboard?date='+date+'&grade='+grade+'&sch_ID='+sch_ID)
const totalCountByMonth=(grade, month, sch_ID)=>axios.get('/api/dasboard2?grade='+grade+'&month='+month+'&sch_ID='+sch_ID)
const GetStatistics = () =>axios.get('/api/studystats')
const AddSchool = (data) =>axios.post('/api/school', data)
const GetAttendanceBySchool = (grade, month, sch_ID) =>axios.get('/api/attendance2?grade='+grade+'&month='+month+'&sch_ID='+sch_ID)
const GetAdmin = () =>axios.get('/api/admin')
const AddAdmin = (data) =>axios.post('/api/admin', data)
const DeleteAdmin = (adminID)=>axios.delete('/api/admin?adminID='+adminID)
const GetAdminByEmail = (email) =>axios.get('/api/admin2?email='+email)

export default{
    GetAdminByEmail,
    GetAdmin,
    AddAdmin,
    DeleteAdmin,
    deleteSchool,
    GetLevels,
    AddSchool,
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