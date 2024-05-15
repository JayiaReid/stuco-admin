import React from 'react'
import { ModeToggle } from '../../_components/ModeToggle'
import { useTheme } from 'next-themes'
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Settings = () => {

    const { theme } = useTheme()

    return (
        <div className='flex gap-5 flex-col'>
            <div className='flex justify-between'>
                <h2 className='text-md'>Change from {theme} mode: </h2>
                <ModeToggle />
            </div>
            <div className='flex justify-between'>
                <h2 className='text-md'>Logout</h2>
                <LogoutLink><Button variant="outline" size="icon"><LogOutIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all'/></Button></LogoutLink>
            </div>
        </div>
    )
}

export default Settings