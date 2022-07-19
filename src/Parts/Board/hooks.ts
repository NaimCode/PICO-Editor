import { RefObject, useEffect, useRef, useState } from "react";
import { STAGE_REF } from "../../App/global";
import { useAppDispatch } from "../../hooks";
import { BoardAction } from "../../state/slices/boardSlice";


export const useNodeEvent=()=>{
const dispatch = useAppDispatch();
  const onMouseOver = (index: number) => {
    document.body.style.cursor = "pointer";
    // dispatch(
    //   BoardAction.updateNode({ index, property: "strokeEnabled", value: true })
    // );
  };
  const onMouseLeave = (index: number) => {
    document.body.style.cursor = "default";
    // dispatch(
    //   BoardAction.updateNode({ index, property: "strokeEnabled", value: false })
    // );
  };
  const onClick = (index: number) => {
    dispatch(BoardAction.SelectNode(index));
  };

  const onChange=(index:number,propsChanged:any)=>{
    dispatch(BoardAction.updateNodeProps({index,value:propsChanged}))
  }

  return {onMouseLeave,onClick,onMouseOver,onChange }
}

