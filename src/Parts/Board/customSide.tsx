import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BoardAction,
  SelectBoardActifNode,
  SelectBoardNodes,
  TNode,
} from "../../state/slices/boardSlice";
import {
  CgColorBucket as FillIcon,
  CgDropOpacity as OpacityIcon,
} from "react-icons/cg";
import { Popover, Slider, Spacer, Tooltip } from "@geist-ui/core";
import { Link } from "react-router-dom";

const CustomSide = () => {
  const actif = useAppSelector(SelectBoardActifNode);
  const node = useAppSelector(SelectBoardNodes)[actif!];

  return (
    <div className="h-[50px] min-h-[50px] w-full bg-white drop-shadow-sm flex flex-row items-center px-3">
      {node && <EditNode node={node} />}
    </div>
  );
};

export default CustomSide;

const EditNode = ({ node }: { node: TNode }) => {
  switch (node.type) {
    case "rect":
      return (
        <>
          <FillButton node={node} />
          <OpacityButton node={node} />
        </>
      );

    default:
      return <div>rine</div>;
  }
};

const FillButton = ({ node }: { node: TNode }) => {
  const dispath = useAppDispatch();

  return (
    <div className="relative  flex flex-col items-center justify-center iconButton gap-1 rounded-sm text-lg">
      <input
        className="cursor-pointer rounded-md border-none bg-transparent opacity-0 w-[40px] h-[40px] absolute top-0 left-0"
        type={"color"}
        onChange={(e) =>
          dispath(
            BoardAction.updateNode({ property: "fill", value: e.target.value })
          )
        }
      />
      <FillIcon />
      <div
        style={{ backgroundColor: node.props.fill }}
        className={"h-[8px] w-[20px] rounded-sm border-[1px]"}
      ></div>
    </div>
  );
};

const OpacityButton = ({ node }: { node: TNode }) => {
  const dispath = useAppDispatch();

  const content = () => (
    <div style={{ padding: "0 10px" }} className="w-[200px] px-5">
      <Slider
        initialValue={node.props.opacity ? node.props.opacity * 100 : 100}
        onChange={(e) => {
          dispath(
            BoardAction.updateNode({ property: "opacity", value: e / 100 })
          );
        }}
      />
    </div>
  );
  return (
    <Popover content={content} className="iconButton text-lg">
      <OpacityIcon />
    </Popover>
  );
};
