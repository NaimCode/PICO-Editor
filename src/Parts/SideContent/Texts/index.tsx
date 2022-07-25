import React, { FunctionComponent, useEffect, useState } from "react";
import SideContent from "..";

import { BoardAction, TNodeType } from "../../../state/slices/boardSlice";
import { useAppDispatch } from "../../../hooks";

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
  const handleAddText = (props: any) => {
    const communProps = {
      ...props,
      fill: "black",
    };
    dispatch(BoardAction.AddNode({ type: "text", props: communProps }));
  };

  return (
    <SideContent>
      <div className="flex flex-col overflow-y-scroll">
        <span className="text-white text-sm font-semibold pb-3">
          Basic text
        </span>
        <div className="flex flex-col gap-3 p-2">
          <button
            onClick={() =>
              handleAddText({
                fontSize: 30,
                text: "Add a header",
                fontVariant: "bold",
                width: 200,
              })
            }
            className="transition-all py-4 px-3 text-3xl font-semibold bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg"
          >
            Add a header
          </button>
          <button
            onClick={() =>
              handleAddText({
                fontSize: 20,
                text: "Add a subheader",
                fontVariant: "bold",
                width: 180,
              })
            }
            className="transition-all py-4 px-3 text-xl bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg"
          >
            Add a subheader
          </button>
          <button
            onClick={() =>
              handleAddText({
                fontSize: 16,
                text: "Add a paragraph",
                width: 150,
              })
            }
            className="transition-all font-light py-3 px-3 bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg"
          >
            Add a paragraph
          </button>
        </div>
      </div>
    </SideContent>
  );
};

export default Texts;
