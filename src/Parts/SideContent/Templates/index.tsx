import React, { useState } from "react";
import { Layer, Stage } from "react-konva";
import SideContent from "..";
import { useAppSelector } from "../../../hooks";
import { TProjectSize } from "../../../state/slices/boardSlice";
import { SelectData, TTemplate } from "../../../state/slices/dataSlice";
import ShapeItemReadOnly from "./shapeItemReadOnly";

const Templates = () => {
  const { templates } = useAppSelector(SelectData);
  const [filterType, setFilterType] = useState<TProjectSize>("Landscape");
  console.log(templates);
  
  return (
    <SideContent>
      <div className="relative overflow-y-scroll">
        <div className="sticky top-0 left-0 w-full px-1 py-3 drop-shadow-xl bg-sideContent/60 flex flex-row justify-between gap-3">
          {["Square", "Landscape", "Portrait"].map((item, i) => {
            return (
              <button
                onClick={() => {
                  setFilterType(item as TProjectSize);
                }}
                className={`${
                  filterType == item && "bg-borderSecond"
                } transition-all duration-500 hover:bg-borderSecond/80 font-light text-white border-[1px] rounded-xl py-2 px-[15px] border-borderSecond`}
                key={i}
              >
                {item}
              </button>
            );
          })}
        </div>
        <span className="text-white m-10">{templates.length}</span>
        {filterType == "Landscape" && (
          <div className="flex flex-col gap-3 ">
            {templates
              .filter((t) => t.type == "Landscape")
              .map((t) => {
                return (
                  <TemplateItem
                    template={t}
                    size={{ width: 330, height: 170 }}
                  />
                );
              })}
          </div>
        )}
      </div>
    </SideContent>
  );
};

export default Templates;

type TTemplateItem = {
  template: TTemplate;
  size: { width: number; height: number };
};

const TemplateItem = ({ template, size }: TTemplateItem) => {
  return (
    <Stage width={size.width} height={size.height}>
      <Layer>
        {template.nodes.map((node, i) => {
          return <ShapeItemReadOnly node={node} />;
        })}
      </Layer>
    </Stage>
  );
};
