import React from 'react'
import CustomSide from './customSide'

const Board = () => {
  return (
    <div className="flex-grow flex flex-col bg-[#f4f4f5]">
        <CustomSide/>
        <div className="flex-grow flex flex-col items-center justify-center">

        </div>
    </div>
  )
}

export default Board