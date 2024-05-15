"use client"
import { LoginLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LoaderIcon, Settings2Icon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Settings from './_components/Settings';
import Questions from './_components/Questions';


// functions:
/* 
    - change mode
    - school information 
    - admin information 
    - log out
*/

const Profile = () => {

  const { user } = useKindeBrowserClient();
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div className='flex h-screen items-center justify-center animate-spin'>
    <LoaderIcon />
  </div>

  return isAuthenticated ? (
    <div>
      {/* flex display */}
      <div className='pb-5 h-[55vh] w-[screen] md:w-screen lg:w-[83.4vw] flex justify-start gap-8 items-end'>
        <img className='absolute h-[50vh] max-w-[100%]  w-[100%] z-[-1] object-cover top-0' src={'/profile.jpeg'} />
        {/* profile overview
      - profile photo, name, school */}
        <Avatar className='mx-10 h-[200px] w-auto rounded-full shadow-lg'>
          <AvatarImage width={35} alt='user' src={user?.picture} />
          <AvatarFallback><Image src={user?.picture} width={35} height={35} alt='user' /></AvatarFallback>
        </Avatar>
        <div>
          <h2 className='text-lg font-bold '>{user?.given_name} {user?.family_name}</h2>
          <h2 className='text-s text-slate-400'>{user?.email}</h2>
        </div>
        
      </div>
      <div className='w-100vw'>
        <hr className=' mx-10 my-10'/>
      </div>
      
      {/* settings icon to settings */}
      {/* settings
      - change mode 
      - logout
       */}
       <div className='my-10 mx-5'>
        <h2 className='my-5 font-bold text-lg'>Settings</h2>
       <Settings/>
       </div>

       <div className='w-100vw'>
        <hr className=' mx-10 my-10'/>
      </div>

      <div className='my-10 mx-5'>
        <h2 className='my-5 font-bold text-lg'>Questions</h2>
       <Questions/>
       </div>
        
      {/* questions icon to question */}
      {/* questions answered
      - accordion component */}

      {/* school information
      - number of students, attendance percentage */}


    </div>
  ) : (
    <div className='flex h-screen items-center justify-center'>
      <h2 className='text-lg text-foreground'> You have to <LoginLink>Login</LoginLink> to see this page </h2>
    </div>
  );
}

export default Profile