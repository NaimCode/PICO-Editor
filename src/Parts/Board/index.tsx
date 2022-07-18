import React, { RefObject, useEffect, useRef, useState } from "react";
import { Layer, Rect, Shape, Stage } from "react-konva";
import { useElementSize } from "use-element-size";
import { useAppSelector } from "../../hooks";
import { SelectBoardStage } from "../../state/slices/boardSlice";
import CustomSide from "./customSide";
import { useBoardSize } from "./hooks";

type BoardProps = {
  stageRef: RefObject<any>;
};
const Board = ({ stageRef }: BoardProps) => {
  const stage =useAppSelector(SelectBoardStage)
  return (
    <div className="bg-[#f4f4f5] flex-grow flex flex-col overflow-hidden">
      <CustomSide />
      <div className="overflow-scroll  flex-grow flex flex-col items-center justify-center p-5">
        <Stage
          ref={stageRef}
          width={stage.dimension.width}
          height={stage.dimension.height}
        >
          <Layer>
            <Rect
              cornerRadius={10}
              fill={stage.fill}
              width={stage.dimension.width}
              height={stage.dimension.height}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Board;
