import React, { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import SideContent from "..";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { BoardAction, TProjectSize } from "../../../state/slices/boardSlice";
import { DataAction, SelectData, TTemplate } from "../../../state/slices/dataSlice";
import ShapeItemReadOnly from "./shapeItemReadOnly";
import { HiOutlineDocumentAdd as AddIcon } from "react-icons/hi";
import { SelectUserRole } from "../../../state/slices/userSlice";
import {AiOutlineDelete as DeleteIcon} from 'react-icons/ai'
import { Badge, useToasts } from "@geist-ui/core";
import TemplateQuery from "../../../Query/templates";

const Templates = () => {
  const { templates } = useAppSelector(SelectData);
  const [filterType, setFilterType] = useState<TProjectSize>("Square");
  const dispatch=useAppDispatch();
  useEffect(() => {
   TemplateQuery.getTemplates(templates,dispatch)
  }, [])
  //nothing
  return (
    <SideContent>
      <div className="relative overflow-y-scroll flex flex-col gap-4 ">
        <div className="z-20 sticky top-0 left-0 w-full px-1 py-3 backdrop-blur-2xl bg-sideContent/90 flex flex-row justify-between gap-3">
          {["Square", "Landscape", "Portrait"].map((item, i) => {
            const t=item as TProjectSize
            const lenght=templates.filter((tem,i)=>tem.type==t).length
            return (
                <Badge.Anchor    key={i}>
                <Badge className="-translate-x-2 bg-yellow-400 text-black" scale={0.5}>
                    {lenght>=100?"99+":lenght}
                </Badge>
              
           
              <button
                onClick={() => {
                  setFilterType(item as TProjectSize);
                 
                }}
                className={`${
                  filterType == item && "bg-[#525757]"
                } transition-all duration-500 hover:bg-[#525757]/80 font-light text-white border-[1px] rounded-xl py-2 px-[15px] border-[#525757]`}
             
              >
                {item}
              </button>
              </Badge.Anchor>
            );
          })}
        </div>

        {filterType == "Landscape" && (
          <div className="flex flex-col gap-5 items-center">
            {templates
              .filter((t) => t.type == "Landscape")
              .map((t,i) => {
                return <TemplateItem key={i} index={i} template={t} w={300} />;
              })}
          </div>
        )}

    {filterType == "Square" && (
          <div className="flex flex-wrap gap-5 justify-center">
            {templates
              .filter((t) => t.type == "Square")
              .map((t,i) => {
                return <TemplateItem key={i} index={i} template={t} w={140} />;
              })}
          </div>
        )}
    
    {filterType == "Portrait" && (
          <div className="flex flex-wrap gap-5 justify-center">
            {templates
              .filter((t) => t.type == "Portrait")
              .map((t,i) => {
                return <TemplateItem key={i} index={i} template={t} w={140} />;
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
  index:number
};

const TemplateItem = ({ template, w,index }: TTemplateItem) => {

  const size = (w: number, type: TProjectSize) => {
    const ratio = type == "Landscape" ? 2 : type == "Portrait" ? 0.7 : 1;
    const wType = type == "Landscape" ? 800 : type == "Portrait" ? 420 : 520;
    return { width: w, height: w / ratio, scale: w / wType };
  };
  const { width, height, scale } = size(w, template.type);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

const role=useAppSelector(SelectUserRole)
  return (
    <div ref={ref} className="rounded-md overflow-hidden relative drop-shadow-md">
      <div
        // onClick={() => {
        //   dispatch(BoardAction.UseTemplate(template.nodes));
        // }}
        className="opacity-0 flex flex-col gap-5 hover:opacity-100 absolute backdrop-blur-md transition-all duration-300 text-white text-3xl top-0 left-0 h-full w-full bg-black/60 z-10 justify-center items-center"
      >
        <button 
             onClick={() => {
          dispatch(BoardAction.UseTemplate(template.nodes));
        }}
        className="transition-all hover:scale-105 bg-primary rounded-md px-2 py-2  text-xl font-light">
           <AddIcon/>
        </button>
     {role!='user' &&    <button 
             onClick={() => {
          TemplateQuery.DeleteTemplate(template.id,dispatch);
        }}
        className="transition-all hover:scale-105 bg-red-600 rounded-md px-2 py-2  text-xl font-light">
            <DeleteIcon/>
        </button>}
      </div>
      <Stage scaleX={scale} scaleY={scale} width={width} height={height}>
        <Layer>
          {template.nodes.map((node, i) => {
            return <ShapeItemReadOnly key={i} node={node} />;
          })}
        </Layer>
      </Stage>
    </div>
  );
};
