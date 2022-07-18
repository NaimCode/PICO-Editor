import React from 'react'
import { useAppDispatch } from '../../hooks'
import { BoardAction } from '../../state/slices/boardSlice'

const CustomSide = () => {
  const dispatch=useAppDispatch()

  return (
    <div className='h-[50px] min-h-[50px] w-full bg-white shadow-sm'>
      {/* <button onClick={
        ()=>{
          dispatch(BoardAction.updateStage({property:"fill",value:"rgb(12,342,54,.5)"}))
        }}>Change BG</button> */}
    </div>
  )
}

export default CustomSide