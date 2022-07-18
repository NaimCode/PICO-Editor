import React, { useEffect, useRef, useState } from "react";
import { Layer, Rect, Shape, Stage } from "react-konva";
import { useElementSize } from "use-element-size";
import CustomSide from "./customSide";
import { useBoardSize } from "./hooks";

const Board = () => {
  const { ref: boardRef, isReadyStage, dimension } = useBoardSize({});

  return (
    <div className="bg-[#f4f4f5] flex-grow flex flex-col overflow-hidden">
      <CustomSide />
      <div
        ref={boardRef}
        className="overflow-scroll  flex-grow flex flex-col items-center justify-center p-5"
      >
        {isReadyStage && (
          <Stage
            className="bg-[white] transition-all hover:border-2 border-[#00a1ff] rounded-md overflow-hidden"
            onClick={(e) => console.log(e)}
            width={430}
            height={600}
          ></Stage>
        )}
      </div>
    </div>
  );
};

export default Board;
