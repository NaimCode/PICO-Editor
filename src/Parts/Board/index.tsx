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
import CustomSide from "./customSide";
import { useNodeEvent } from "./hooks";
import ShapeItem from './shapeItem';

type BoardProps = {
  stageRef: RefObject<any>;
};
const Board = ({ stageRef }: BoardProps) => {
  const {nodes, nodeActif:actif,undo} = useAppSelector(SelectBoard);

  const { onClick, onMouseOver, onMouseLeave,onChange } = useNodeEvent();
console.log(nodes);

  return (
    <div className="bg-[#f4f4f5] flex-grow flex flex-col overflow-hidden">
      <CustomSide />
      <div className="overflow-scroll  flex-grow flex flex-col items-center justify-center p-5">
        <Stage
          
          width={nodes[undo][0].props.width}
          height={nodes[undo][0].props.height}
        >
          <Layer ref={stageRef}>
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
              
             return <ShapeItem key={i} props={props} isSelected={actif == i} node={node} index={i} onChange={onChange}/>
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Board;

// type ShapeItemProps={
//   node:TNode,i:number,actif:number,
//   onClick:Function, onMouseOver:Function, onMouseLeave :Function,
// }
// const ShapeItem:FunctionComponent<ShapeItemProps>=({node,i,actif,onClick, onMouseOver, onMouseLeave}:ShapeItemProps)=>{
//  const ref =useRef()

// let Content
// console.log(node.type);

//   switch (node.type) {
//     case "rect":
//       return <Rect {...props} />;
//     case "arc":
//       return <Arc {...props} />;
//     case "star":
//       return <Star {...props} />;
//     case "regularPolygon":
//       return <RegularPolygon {...props} />;
//     case "circle":
//       return <Circle {...props} />;
//     case "ellipse":
//       return <Ellipse {...props} />;
//     case "text":
//       return <Text {...props} />;
//     case "image":
//       return <Image {...props} />;

//     default:
//       return <Rect {...props} />;
//     }
// }