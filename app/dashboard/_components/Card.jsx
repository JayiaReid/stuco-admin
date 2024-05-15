import React from 'react'

const Card = ({icon, title, value}) => {
  return (
    <div className='flex items-center p-7 gap-5 bg-accent rounded-lg shadow-md'>
        <div className='p-2 h-20 w-10 rounded-full bg-white text-primary'>
            {icon}
        </div>
        <div>
            <h2 className='font-bold'>{title}</h2>
            <h2 className='text-lg'>{value}</h2>
        </div>
    </div>
  )
}

export default Card