import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Layer, Rect, Shape, Stage } from "react-konva";
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
              const { props } = node;
              const strokeEnabled =
                actif == i ? true : props.strokeEnabled ? true : false;
              switch (node.type) {
                case "rect":
                  return (
                    <Rect
                      key={i}
                      {...props}
                      stroke="#00a1ff"
                      strokeWidth={4}
                      strokeEnabled={strokeEnabled}
                      onClick={(e) => onClick(i)}
                      onMouseLeave={(e) => onMouseLeave(i)}
                      onMouseOver={(e) => onMouseOver(i)}
                    />
                  );

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
