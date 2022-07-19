import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BoardAction,
  SelectBoardActifNode,
  SelectBoardNodes,
  TNode,
} from "../../state/slices/boardSlice";
import { CgColorBucket as FillIcon } from 'react-icons/cg';
import { Tooltip } from "@geist-ui/core";

const CustomSide = () => {
  const dispatch = useAppDispatch();
  const actif = useAppSelector(SelectBoardActifNode);
  const node = useAppSelector(SelectBoardNodes)[actif!];
  
console.log(actif);

  return (
    <div className="h-[50px] min-h-[50px] w-full bg-white drop-shadow-sm flex flex-row items-center gap-1 px-3">
      {node && <EditNode node={node}/>}
    </div>
  );
};

export default CustomSide;


const EditNode=({node}:{node:TNode})=>{
switch (node.type) {
  case "rect":
    
  return  (<><FillButton/> <input type={"color"}/></>)

  default:
   return <div>rine</div>
}
}

const FillButton=()=>{

  return <button  className="flex flex-col items-center justify-center gap-1 hover:bg-gray-100/60 w-[40px] h-[40px] rounded-sm text-lg"><FillIcon/><div className="h-[6px] w-[20px] bg-blue-200"></div> </button>
 
}