import React, { FunctionComponent, ReactNode } from 'react'

type IconButtonProps={
    icon:ReactNode,
     props?:any
}
const IconButton:FunctionComponent<IconButtonProps> = ({icon,props}:IconButtonProps) => {
  return (
    <button {...props} className='text-white/60 hover:text-white p-1 text-lg'>
        {icon}
    </button>
  )
}

export default IconButton