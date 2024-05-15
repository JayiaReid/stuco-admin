import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import React from 'react'


const ProfileHead = () => {

    const { user } = useKindeBrowserClient();
//   const { isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div>
        <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback><Image src={user?.picture} width={35} height={35} alt='user' className='rounded-full' /></AvatarFallback>
        </Avatar>
        <h2 className='text-sm font-bold '>{user?.given_name} {user?.family_name}</h2>
        <h2 className='text-xs text-slate-400'>{user?.email}</h2>
      </div>
    </div>
  )
}

export default ProfileHead