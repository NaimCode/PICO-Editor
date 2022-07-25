import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import SideContent from "..";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { BoardAction, TProjectSize } from "../../../state/slices/boardSlice";
import { SelectData, TTemplate } from "../../../state/slices/dataSlice";
import ShapeItemReadOnly from "./shapeItemReadOnly";
import { HiOutlineDocumentAdd as AddIcon } from "react-icons/hi";
const Templates = () => {
  const { templates } = useAppSelector(SelectData);
  const [filterType, setFilterType] = useState<TProjectSize>("Landscape");
  console.log(templates);

  return (
    <SideContent>
      <div className="relative overflow-y-scroll flex flex-col gap-4">
        <div className="z-20 sticky top-0 left-0 w-full px-1 py-3 backdrop-blur-2xl bg-sideContent/90 flex flex-row justify-between gap-3">
          {["Square", "Landscape", "Portrait"].map((item, i) => {
            return (
              <button
                onClick={() => {
                  setFilterType(item as TProjectSize);
                }}
                className={`${
                  filterType == item && "bg-[#525757]"
                } transition-all duration-500 hover:bg-[#525757]/80 font-light text-white border-[1px] rounded-xl py-2 px-[15px] border-[#525757]`}
                key={i}
              >
                {item}
              </button>
            );
          })}
        </div>

        {filterType == "Landscape" && (
          <div className="flex flex-col gap-5 items-center">
            {templates
              .filter((t) => t.type == "Landscape")
              .map((t) => {
                return <TemplateItem template={t} w={300} />;
              })}
          </div>
        )}

    {filterType == "Square" && (
          <div className="flex flex-wrap gap-5 justify-center">
            {templates
              .filter((t) => t.type == "Square")
              .map((t) => {
                return <TemplateItem template={t} w={140} />;
              })}
          </div>
        )}
    
    {filterType == "Portrait" && (
          <div className="flex flex-wrap gap-5 justify-center">
            {templates
              .filter((t) => t.type == "Portrait")
              .map((t) => {
                return <TemplateItem template={t} w={140} />;
              })}
          </div>
        )}
      </div>
    </SideContent>
  );
};

// case "Landscape":
//     width = 620;
//     height = 360;
//     //1,722222222
//     break;
//   case "Square":
//     width = 500;
//     height = 500;
//     //1
//     break;
//   case "Portrait":
//     width = 420;
//     height = 600;
//     //0,7
//     break;
export default Templates;

type TTemplateItem = {
  template: TTemplate;
  w: number;
};

const TemplateItem = ({ template, w }: TTemplateItem) => {
  const size = (w: number, type: TProjectSize) => {
    const ratio = type == "Landscape" ? 1.722222 : type == "Portrait" ? 0.7 : 1;
    const wType = type == "Landscape" ? 700 : type == "Portrait" ? 420 : 500;
    return { width: w, height: w / ratio, scale: w / wType };
  };
  const { width, height, scale } = size(w, template.type);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  return (
    <div ref={ref} className="rounded-md overflow-hidden relative drop-shadow-md">
      <button
        onClick={() => {
          dispatch(BoardAction.UseTemplate(template.nodes));
        }}
        className="opacity-0 flex hover:opacity-100 absolute transition-all duration-300 text-white text-3xl top-0 left-0 h-full w-full bg-black/70 z-10 justify-center items-center"
      >
        <AddIcon />
      </button>
      <Stage scaleX={scale} scaleY={scale} width={width} height={height}>
        <Layer>
          {template.nodes.map((node, i) => {
            return <ShapeItemReadOnly node={node} />;
          })}
        </Layer>
      </Stage>
    </div>
  );
};
