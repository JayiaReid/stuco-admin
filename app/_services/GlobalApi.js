const { default: axios } = require("axios");

const GetGrades=()=>axios.get('/api/grade')
const GetSchools=()=>axios.get('/api/school')
const createStudent=(data)=>axios.post('/api/student',data)

export default{
    GetGrades,
    GetSchools,
    createStudent
}