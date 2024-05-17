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
import { useForm } from 'react-hook-form'
import GlobalApi from '@/app/_services/GlobalApi'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

const AddSchool = ({ refreshData }) => {

    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false)
    const [levels, setLevels] = useState([])

    const [school, setSchool] = useState({
        sch_name: "",
        level_ID: "",
        region: "",
        country: "",
    })

    const {
        formState: { errors },
    } = useForm()

    const reset = () => {
        setSchool({
            sch_name: "",
            level_ID: "",
            region: "",
            country: "",
        })
    }

    const handleClose = (e) => {
        e.preventDefault()
        setOpen(false)
        refreshData()
        reset()
    }

    const handleChange = (e) => {

        const { name, value } = e.target
        setSchool({ ...school, [name]: value })
    }

    const getLevels = () => {

        GlobalApi.GetLevels().then(res => {
            setLevels(res.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getLevels()
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(school)

        GlobalApi.AddSchool(school).then(res => {

            if (res.data) {
                handleClose(e)
                toast('New School Added')
            }

            setLoading(false)
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}><p>+ Add New School</p></Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New School</DialogTitle>
                        <DialogDescription >
                            <form>
                                <div className='py-3'>
                                    <label>School Name</label>
                                    <Input name="sch_name"
                                        value={school.sch_name}
                                        onChange={handleChange}
                                        placeholder='Ex. Saint Lou College'
                                    />
                                </div>
                                <div className='py-3 flex flex-col'>
                                    <label>Level</label>
                                    <select className="p-3 border rounded-lg bg-transparent" name="level_ID"
                                        value={school.level_ID}
                                        onChange={handleChange}>
                                        <option value={null}>Select a Level</option>
                                        {levels.map((level, index) => (
                                            <option key={index} value={level.level_ID}>{level.level_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='py-3'>
                                    <label>Region</label>
                                    <Input name="region"
                                        value={school.region}
                                        onChange={handleChange}
                                        placeholder='Ex. NY (2 characters long)' />
                                </div>
                                <div className='py-3'>
                                    <label>Country</label>
                                    <Input name="country"
                                        value={school.country}
                                        onChange={handleChange}
                                        placeholder='Ex.USA (3 characters long)' />
                                </div>

                                <div className='flex gap-3 items-center justify-end mt-5'>
                                    <Button onClick={handleClose} variant='ghost'>Cancel</Button>
                                    <Button disable={loading} onClick={onSubmit}>Save {loading && <Loader2Icon className='animate-spin' />}</Button>
                                </div>
                            </form>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddSchool