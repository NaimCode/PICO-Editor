import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Arc,
  Circle,
  Ellipse,
  Group,
  Image,
  Layer,
  Rect,
  RegularPolygon,
  Stage,
  Star,
  Text,
} from "react-konva";
import { useElementSize } from "use-element-size";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BoardAction,
  SelectBoard,
  SelectBoardActifNode,
  SelectBoardNodes,
  TNode,
} from "../../state/slices/boardSlice";
import { DataAction } from "../../state/slices/dataSlice";
import { SelectUserRole } from '../../state/slices/userSlice';
import CustomSide from "./customSide";
import { useNodeEvent } from "./hooks";
import ShapeItem from './shapeItem';

type BoardProps = {
  stageRef: RefObject<any>;
};
const Board = ({ stageRef }: BoardProps) => {
  const {nodes, nodeActif:actif,undo} = useAppSelector(SelectBoard);

   const [dimension,setdimension]=useState<{width:number,height:number}>()
  const { onClick, onMouseOver, onMouseLeave,onChange } = useNodeEvent();
  let data = {
    frameGroup: { x: 50, y: 100, width: 800, height: 300, strokeWidth: 10, stroke: 'cyan'},
    fadeImage: {opacity: 0.3}
  }
  useEffect(() => {
    if(stageRef.current){
      const stage=document.getElementById('stage')
      stage?.scrollIntoView(false)
      
    }
  }, [])
  return (
    <div className="bg-[#f4f4f5] flex-grow flex flex-col overflow-hidden relative">
      <SaveTemplate nodes={nodes[undo]}/>
      <CustomSide />
      <div className="overflow-scroll  flex-grow">
   <div className={`w-[1000px] transition-all h-[1000px] scale-${'150'} flex flex-col items-center justify-center`}>
   <Stage id="stage"
          ref={stageRef}
          width={nodes[undo][0].props.width} height={nodes[undo][0].props.height}
        >
        
          <Layer imageSmoothingEnabled>
            
            {nodes[undo].map((node, i) =>{
             
                const strokeEnabled =
                actif == i ? true : node.props.strokeEnabled ? true : false;
              const props = {
                key: i,
                ...node.props,
             
                draggable:i!=0?!node.lock:false,
                // stroke: "#00a1ff",
                // strokeWidth: 2,
                // strokeEnabled: strokeEnabled,
                onClick: (e: any) => onClick(i),
                onMouseLeave: (e: any) => onMouseLeave(i),
                onMouseOver: (e: any) => onMouseOver(i),
               
                 onDragEnd:(e:any)=>onChange(i,{
                  x: e.target.x(),
                  y: e.target.y(),
                 })
              };
              
             return <ShapeItem    stageRef={stageRef} key={i} props={props} isSelected={actif == i} node={node} index={i} onChange={onChange}/>
            })}
         
          </Layer>
        </Stage>
   </div>
      
      </div>
    </div>
  );
};

export default Board;


const SaveTemplate=({nodes}:{nodes:Array<TNode>})=>{
  const dispatch=useAppDispatch()
  const role=useAppSelector(SelectUserRole)

if(role!='user')
{
  return <button onClick={()=>{
    dispatch(DataAction.AddTemplate(nodes))
  }} className="bg-primary absolute text-sm font-light text-white px-2 py-2 bottom-0 right-0 m-3 rounded-md drop-shadow-md">
    Save template
  </button>
}
else 
return <div></div>
}