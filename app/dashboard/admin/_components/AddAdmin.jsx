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

const AddAdmin = ({ refreshData }) => {

    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false)

    const [admin, setAdmin] = useState({
        fname: "",
        lname: "",
        role: "",
        email: "",
    })

    const {
        formState: { errors },
    } = useForm()

    const reset = () => {
        setAdmin({
            fname: "",
            lname: "",
            role: "",
            email: "",
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
        setAdmin({ ...admin, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(admin)

        GlobalApi.AddAdmin(admin).then(res => {

            if (res.data) {
                handleClose(e)
                toast('New admin Personel Added')
            }

            setLoading(false)
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}><p>+ Add Admin Personel</p></Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Admin Personel</DialogTitle>
                        <DialogDescription >
                            <form>
                                <div className='py-3'>
                                    <label>First Name</label>
                                    <Input name="fname"
                                        value={admin.fname}
                                        onChange={handleChange}
                                        placeholder='Ex. Jane'
                                    />
                                </div>
                                <div className='py-3'>
                                    <label>Last Name</label>
                                    <Input name="lname"
                                        value={admin.lname}
                                        onChange={handleChange}
                                        placeholder='Ex. Doe' />
                                </div>
                                <div className='py-3'>
                                    <label>email</label>
                                    <Input name="email"
                                        value={admin.email}
                                        onChange={handleChange}
                                        placeholder='Ex.janedoe@gmail.com' />
                                </div>
                                <div className='py-3'>
                                    <label>Role</label>
                                    <Input name="role"
                                        value={admin.role}
                                        onChange={handleChange}
                                        placeholder='Ex.administrator' />
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

export default AddAdmin