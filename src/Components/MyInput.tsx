
import { Input } from '@geist-ui/core';
import { FunctionComponent } from 'react';

const MyInput:FunctionComponent = ({}) => {
  return (
    <input className='border-blue-500 bg-transparent placeholder:text-white/30 text-white/80 w-[350px] ' placeholder='Your new project'/>
  )
}

export default MyInput