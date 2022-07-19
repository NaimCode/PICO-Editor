import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BoardAction,
  SelectBoardActifNode,
  SelectBoardNodes,
  TNode,
} from "../../state/slices/boardSlice";

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
    
  return  (<></>)

  default:
   return <div>rine</div>
}
}