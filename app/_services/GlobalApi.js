const { default: axios } = require("axios");

const GetGrades=()=>axios.get('/api/grade')
const GetSchools=()=>axios.get('/api/school')
const createStudent=(data)=>axios.post('/api/student',data)
const GetStudents=()=>axios.get('/api/student')
const deleteStudent=(userID)=>axios.delete('/api/student?userID='+userID)
const GetAttendance=(grade, month)=>axios.get('/api/attendance?grade='+grade+'&month='+month)

export default{
    GetGrades,
    GetSchools,
    createStudent,
    GetStudents,
    deleteStudent,
    GetAttendance
}