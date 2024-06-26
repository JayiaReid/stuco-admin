import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import '../../../ag-grid-theme-builder.css'
import '../../../ag-grid-theme-builder (1).css'
import '../../../ag-grid-theme-builder-system.css'
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Loader2Icon, Search, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '@/app/_services/GlobalApi';

const SchoolList = ({ refreshData, schools }) => {
    const [search, setsearch] = useState('')

    const { theme } = useTheme()

    const CustomButtons = (props) => {

      return (
        <AlertDialog>
          <AlertDialogTrigger><Button size='sm' variant='destructive'><Trash /></Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this school
                and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteSchool(props?.data.sch_ID)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      )
    }

    const [cols, setcols] = useState([
        { field: "sch_ID" },
        { field: "sch_name" },
        { field: "level_ID" },
        { field: "region", filter: true },
        { field: "country", filter: true },
        { field: "action", cellRenderer: CustomButtons }
    ])

    const [rows, setrows] = useState([])

    useEffect(() => {
        schools && setrows(schools)
    }, [schools])

    const deleteSchool = (sch_ID) =>{
      GlobalApi.deleteSchool(sch_ID).then(res=>{
        if(res.data){
          toast('School deleted')
          refreshData()
          console.log(res.data)
        }
      }).catch(err=>console.log(err))
    }

    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [25, 50, 100];

    return (
        <div className='my-7'>
            <div
                className={`ag-theme-custom-${theme}`}
                style={{ height: 500 }}
            >
                <div className='p-2 rounded-lg border shadow-sm mb-4 max-w-sm flex gap-2'>
                    <Search />
                    <input className='outline-none bg-transparent' type='text' placeholder='Search' onChange={(e) => setsearch(e.target.value)} />
                </div>

                <AgGridReact className='z-[-1]'
                    rowData={rows}
                    columnDefs={cols}
                    quickFilterText={search}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />

            </div>
        </div>
    )
}

export default SchoolList