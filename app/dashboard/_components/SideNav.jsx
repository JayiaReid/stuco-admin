import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CircleUserIcon, CpuIcon, EuroIcon, GraduationCapIcon, HandIcon, LayoutIcon, School2Icon, SettingsIcon, XIcon } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation';
import GlobalApi from '@/app/_services/GlobalApi';

const SideNav = ({ showNav }) => {
    const { user } = useKindeBrowserClient();
    const path = usePathname();

    const [isHead, setIsHead]=useState(false)
    const [isAdmin, setIsAdmin]=useState(false)

    const GetRole = () =>{
        GlobalApi.GetAdminByEmail(user?.email).then(res=>{
            if(res.data[0].email === user?.email){
                if(res.data[0].role === 'head-admin'){
                    setIsHead(true)
                    setIsAdmin(true)
                }
                else if(res.data[0].role === 'administrator'){
                    setIsAdmin(true)
                }
            }
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        if(user){
          GetRole()  
        }
        
    }, [user?.email])

    // const isAdmin = user?.id === "kp_851b57c18edb47019bba2a4db2bc3504";

    const menu = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutIcon,
            path: '/dashboard'
        },
        {
            id: 2,
            name: "Students",
            icon: GraduationCapIcon,
            path: '/dashboard/students'
        },
        {
            id: 3,
            name: "Attendance",
            icon: HandIcon,
            path: '/dashboard/attendance'
        }, 
        {
            id: 4,
            name: "Admins",
            icon: CpuIcon,
            path: '/dashboard/admin',
            isVisible: isHead
        },
        {
            id: 5,
            name: "Schools",
            icon: School2Icon,
            path: '/dashboard/schools',
            isVisible: isAdmin
        },
        {
            id: 6,
            name: "Admin Profile",
            icon: CircleUserIcon,
            path: '/dashboard/profile',
            // isVisible: isAdmin // Conditionally render based on isAdmin
        }

    ];

    return (
        <div className='z-4 bg-background shadow-md h-screen p-5'>
            <video className='rounded-lg p-5 md:block xs:hidden sm:hidden shadow-md' autoPlay muted loop>
                <source src={'/studying.mp4'} type='video/mp4'/>
            </video>

            <div className='md:hidden cursor-pointer sm:flex sm:justify-end sm:p-3'>
                <XIcon title="close navbar" onClick={()=>showNav(false)}/>
            </div>
            <hr className='md:block sm:hidden my-5'/>

            {menu.map((item, index) => (
                item.isVisible !== false && (
                    <Link key={index} href={item.path}>
                        <h2 
                            className={`${path === item.path && 'bg-primary text-foreground'} flex items-center gap-3 text-md p-4 hover:bg-primary hover:text-foreground my-2 rounded-lg cursor-pointer text-foreground`}
                            onClick={() => showNav(false)}
                        >
                            <item.icon/>
                            {item.name}
                        </h2>
                    </Link>
                )
            ))}

            <div className='bg-background p-4 bottom-5 fixed flex gap-2 items-center'>
                <Image src={user?.picture} width={35} height={35} alt='user' className='rounded-full'/>
                <div>
                    <h2 className='text-sm font-bold '>{user?.given_name} {user?.family_name}</h2>
                    <h2 className='text-xs text-slate-400'>{user?.email}</h2>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
