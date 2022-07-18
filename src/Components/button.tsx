import React, { FunctionComponent, ReactNode } from 'react'

type ButtonType={
    startIcon?:ReactNode
    endIcon?:ReactNode
    children:ReactNode
    className?:string
}
const Button:FunctionComponent<ButtonType> = ({startIcon,endIcon,children,className}:ButtonType) => {
  return (
    <button className={className}>{children}</button>
  )
}

export default Button