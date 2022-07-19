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
  Shape,
  Stage,
  Star,
  Text,
} from "react-konva";
import { useElementSize } from "use-element-size";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BoardAction,
  SelectBoardActifNode,
  SelectBoardNodes,
} from "../../state/slices/boardSlice";
import CustomSide from "./customSide";
import { useNodeEvent } from "./hooks";

type BoardProps = {
  stageRef: RefObject<any>;
};
const Board = ({ stageRef }: BoardProps) => {
  const nodes = useAppSelector(SelectBoardNodes);
  const actif = useAppSelector(SelectBoardActifNode);
  const { onClick, onMouseOver, onMouseLeave } = useNodeEvent();

  return (
    <div className="bg-[#f4f4f5] flex-grow flex flex-col overflow-hidden">
      <CustomSide />
      <div className="overflow-scroll  flex-grow flex flex-col items-center justify-center p-5">
        <Stage
          ref={stageRef}
          width={nodes[0].props.width}
          height={nodes[0].props.height}
        >
          <Layer>
            {nodes.map((node, i) => {
              const strokeEnabled =
                actif == i ? true : node.props.strokeEnabled ? true : false;
              const props = {
                key: i,
                ...node.props,
                draggable:i!=0?true:false,
                stroke: "#00a1ff",
                strokeWidth: 4,
                strokeEnabled: strokeEnabled,
                onClick: (e: any) => onClick(i),
                onMouseLeave: (e: any) => onMouseLeave(i),
                onMouseOver: (e: any) => onMouseOver(i),
              };

              switch (node.type) {
                case "rect":
                  return <Rect {...props} />;
                case "arc":
                  return <Arc {...props} />;
                case "star":
                  return <Star {...props} />;
                case "regularPolygon":
                  return <RegularPolygon {...props} />;
                case "circle":
                  return <Circle {...props} />;
                case "ellipse":
                  return <Ellipse {...props} />;
                case "text":
                  return <Text {...props} />;
                case "image":
                  return <Image {...props} />;

                default:
                  break;
              }
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Board;
