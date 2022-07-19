import React, { FunctionComponent, ReactNode } from 'react'

const SideContent = ({children}:{children?:ReactNode}) => {
  return (
    <div className='w-[350px] min-w-[350px] bg-[#1c1e1f] p-5 flex flex-col overflow-y-scroll'>
    {children}
    </div>
  )
}

export default SideContent