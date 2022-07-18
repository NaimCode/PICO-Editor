import React, { FunctionComponent, ReactNode } from 'react'

type IconButtonProps={
    icon:ReactNode
}
const IconButton:FunctionComponent<IconButtonProps> = ({icon}:IconButtonProps) => {
  return (
    <button className='text-white/60 hover:text-white p-1 '>
        {icon}
    </button>
  )
}

export default IconButton