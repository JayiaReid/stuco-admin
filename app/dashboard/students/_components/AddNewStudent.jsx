"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader2Icon } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { useForm } from 'react-hook-form'
import GlobalApi from '@/app/_services/GlobalApi'
import { toast } from 'sonner'

const AddNewStudent = () => {

    const [loading, setLoading]=useState(false)

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState()
    const [grades, setGrades]=useState([])
    const [schools, setSchools]=useState([])
    const [student, setStudent] = useState({
        fname: '',
        lname: '',
        email: '',
        DOB: null,
        stud_ID: '',
        passwrd: '',
        sch_ID: '',
        grade: ''
    })
    const {
        formState: { errors },
      } = useForm()

    useEffect(()=>{
        getGradesList()
        getSchList()
    }, [])

    const reset = ()=>{
        setStudent({
            fname: '',
            lname: '',
            email: '',
            DOB: null,
            stud_ID: '',
            passwrd: '',
            sch_ID: '',
            grade: ''
        })
    }

    const getSchList = ()=>{
        GlobalApi.GetSchools().then(res=>{
            console.log(res.data)
            setSchools(res.data)
        })
    }

      const getGradesList = ()=>{
        GlobalApi.GetGrades().then(res=>{
            console.log(res.data)
            setGrades(res.data)
        })
      }

      const onSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(student)
        GlobalApi.createStudent(student).then(res=>{
            console.log('--', res)
            if(res.data){
               handleClose(e) 
               toast('New Student Added')
            }
            setLoading(false)
        }).catch(err=>console.log(err))
        
      }

      const handleClose = (e)=>{
        e.preventDefault()
        setOpen(false)
        reset()
      }

      const handleChange = (e) => {
        
        const { name, value } = e.target
        setStudent({ ...student, [name]: value })
      }

  return (
    <div>
        <Button onClick={()=>setOpen(true)}><p>+ Add New Student</p></Button>
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription >
                    <form>
                    <div className='py-3'>
                        <label> First Name</label>
                        <Input name="fname"
                            value={student.fname}
                            onChange={handleChange}
                            placeholder='Ex. John' 
                            />
                    </div>
                    <div className='py-3'>
                        <label> Last Name</label>
                        <Input name="lname"
                            value={student.lname}
                            onChange={handleChange}
                            placeholder='Ex. Brown' />
                    </div>
                    <div className='py-3'>
                        <label>Email</label>
                        <Input name="email"
                            value={student.email}
                            onChange={handleChange}
                            placeholder='Ex.johnbrown@school.com' />
                    </div>
                    <hr/>
                    <h2 className='font-bold text-xl py-2'>Administration Data</h2>
                    <div className='py-3'>
                        <label>Student's ID</label>
                        <Input type="number" name="stud_ID"
                            value={student.stud_ID}
                            onChange={handleChange}
                            placeholder='Ex. 1' />
                    </div>
                    <div className='py-3'>
                        <label>Student's Password</label>
                        <Input name="passwrd"
                            value={student.passwrd}
                            onChange={handleChange}
                            placeholder='Ex. abcedfg' />
                    </div>
                    <div className='flex gap-3'>
                        <div className='py-3 flex flex-col'>
                        <label>Institution Name</label>
                        <select className="p-3 border rounded-lg bg-transparent" name="sch_ID"
                            value={student.sch_ID}
                            onChange={handleChange}>
                                <option value={null}>Select a School</option>
                                {schools.map((school, index)=>(
                                    <option key={index} value={school.sch_ID}>{school.sch_name}, {school.region}</option>
                                ))}
                            </select>
                        </div>
                        <div className='py-3 flex-col flex'>
                        <label>Grade</label>
                        <select className="p-3 border rounded-lg bg-transparent" name="grade"
                            value={student.grade}
                            onChange={handleChange}>
                                <option value={null}>Select Grade</option>
                                {grades.map((grade, index)=>(
                                    <option key={index} value={grade.grade}>{grade.grade}</option>
                                ))}
                        </select>
                        </div>
                    </div>
                    
                    <div className='flex gap-3 items-center justify-end mt-5'>
                        <Button onClick={handleClose} variant='ghost'>Cancel</Button>
                        <Button disable={loading} onClick={onSubmit}>Save {loading && <Loader2Icon className='animate-spin'/>}</Button>
                    </div>
                    </form>
                   
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewStudent