import React, { FunctionComponent, useEffect, useState } from "react";
import SideContent from "..";
import { RiSearch2Line as SearchIcon } from "react-icons/ri";
import { GrClose as CloseIcon } from "react-icons/gr";
import {
  Arc,
  Circle,
  Ellipse,
  Label,
  Layer,
  Line,
  Rect,
  RegularPolygon,
  Ring,
  Stage,
  Star,
  Text,
} from "react-konva";
import { BoardAction, TNodeType } from "../../../state/slices/boardSlice";
import { useAppDispatch } from "../../../hooks";
import { TextConfig } from "konva/lib/shapes/Text";
import { Shape } from "konva/lib/Shape";
import { Divider } from "@geist-ui/core";
import { KEY_GIPHY } from "../../../config";

// _partialText: string;
// _partialTextX: number;
// _partialTextY: number;
// textWidth: number;
// textHeight: number;
// fontFamily: GetSet<string, this>;
// fontSize: GetSet<number, this>;
// fontStyle: GetSet<string, this>;
// fontVariant: GetSet<string, this>;
// align: GetSet<string, this>;
// letterSpacing: GetSet<number, this>;
// verticalAlign: GetSet<string, this>;
// padding: GetSet<number, this>;
// lineHeight: GetSet<number, this>;
// textDecoration: GetSet<string, this>;
// text: GetSet<string, this>;
// wrap: GetSet<string, this>;
// ellipsis: GetSet<boolean, this>;
const Texts = () => {
  const dispatch = useAppDispatch();
  const handleAddText=(props:any)=>{
    const communProps={
        ...props,
        fill:"black",
        
    }
    dispatch(BoardAction.AddNode({type:"text",props:communProps}))
  }
  const [search, setSearch] = useState<string>("");
  //useState data array
  const [data, setData] = useState<{ searching: boolean; gifs: any }>();
  const state = {
    searchLimit: 50,
    searching: false,
    searched: false,
    gifs: [],
    url: "https://api.giphy.com/v1/gifs/search?",
    apiKey:KEY_GIPHY,
  };
  //useeffect get gifs from giphy
  useEffect(() => {
    fetchGifs(search);
  }, [search]);

  const fetchGifs = (search: string) => {
    fetch(
      `${state.url}api_key=${state.apiKey}&q=${search}&limit=${state.searchLimit}`
    )
      .then((res) => res.json())
      .then((data) => setData({ gifs: data.data, searching: false }));
  };
  return (
    <SideContent>
     <div className="overflow-y-srcoll">
     <span className="text-white text-sm font-semibold">Basic text</span>
      <div className="flex flex-col gap-3 p-2">
        <button onClick={()=>handleAddText({  fontSize:30,text:"Add a header",fontVariant:"bold",width:200})} className="transition-all py-4 px-3 text-3xl font-semibold bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg">
          Add a header
        </button>
        <button onClick={()=>handleAddText({  fontSize:20,text:"Add a subheader",fontVariant:"bold",width:180})}  className="transition-all py-4 px-3 text-xl bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg">
          Add a subheader
        </button>
        <button onClick={()=>handleAddText({  fontSize:16,text:"Add a paragraph",width:150})}  className="transition-all font-light py-3 px-3 bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg">
          Add a paragraph
        </button>
      </div>
     <Divider className="opacity-0"/>
     <span className="text-white text-sm font-semibold">Special text</span>

     </div>
    </SideContent>
  );
};

export default Texts;

