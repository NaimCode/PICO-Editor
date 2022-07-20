import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BoardAction,
  SelectBoard,
  SelectBoardActifNode,
  SelectBoardNodes,
  TNode,
} from "../../state/slices/boardSlice";
import {
  CgColorBucket as FillIcon,
  CgDropOpacity as OpacityIcon,
} from "react-icons/cg";
import {
  BsLayers as LayerIcon,
  BsChevronDoubleDown as LayerBackIcon,
  BsChevronDoubleUp as LayerTopIcon,
  BsChevronDown as LayerBackSingleIcon,
  BsChevronUp as LayerTopSingleIcon,
  BsArrow90DegLeft as UndoIcon,
  BsArrow90DegRight as RedoIcon,
} from "react-icons/bs";
import { HiOutlineDuplicate as DuplicateIcon, HiOutlineLockClosed as LockIcon } from "react-icons/hi";
import { AiOutlineDelete as DeleteIcon } from "react-icons/ai";
import { Popover, Slider, Spacer, Tooltip } from "@geist-ui/core";
import { Link } from "react-router-dom";

const CustomSide = () => {
  const {nodeActif:actif,nodes,undo} = useAppSelector(SelectBoard);
  const node = useAppSelector(SelectBoardNodes)[actif!];
  const dispatch = useAppDispatch();
  console.log(undo, nodes.length);
  
  return (
    <div className="h-[50px] min-h-[50px] w-full bg-white drop-shadow-sm flex flex-row items-center px-1">
      <button style={{cursor:undo<=0?'not-allowed':'pointer', opacity:undo<=0?.5:1}} onClick={()=>dispatch(BoardAction.UndoRedo("undo"))} className="transition-all text-lg rounded-md  text-black  w-[35px] h-[35px]  hover:bg-gray-200/60 flex items-center justify-center">
        <UndoIcon />
      </button>
      <button style={{cursor:undo<nodes.length - 1?'pointer':'not-allowed', opacity:undo<nodes.length - 1?1:.5}} onClick={()=>dispatch(BoardAction.UndoRedo("redo"))} className="transition-all text-lg rounded-md  text-black  w-[35px] h-[35px]  hover:bg-gray-200/60 flex items-center justify-center">
        <RedoIcon />
      </button>
      <div className="w-[1px] h-[25px] bg-gray-300 mx-1"></div>
      {node && (
        <>
          <EditNode node={node} />
          <div className="flex-grow"></div>
          {actif != 0 && (
            <>
              <div className="w-[1px] h-[25px] bg-gray-300 mx-1"></div>
              <LayerButton onChangeLayerPosition={(position:1|2|-1|2)=>{
                dispatch(BoardAction.UpdateShapeOrder(position))
              }} />
               <LockButton node={node} onLock={()=>{
                dispatch(BoardAction.LockShape())
              }}/>
              <DuplicateButton   onDuplice={()=>{
                dispatch(BoardAction.DuplicateShape())
              }}/>
              <DeleteButton onDelete={()=>{
                dispatch(BoardAction.DeleteShape())
              }}/>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CustomSide;

const EditNode = ({ node }: { node: TNode }) => {
  switch (node.type) {
    case "image":
      return <div>empty</div>;
    case "text":
      return <div>empty</div>;
    default:
      return (
        <>
          <FillButton node={node} />
          <OpacityButton node={node} />
        </>
      );
  }
};

const DuplicateButton = ({onDuplice}:{onDuplice:any}) => {
  return (
    <button onClick={onDuplice} className="iconButton text-lg">
      <DuplicateIcon />
    </button>
  );
};
const LockButton = ({onLock,node}:{onLock:any,node:TNode}) => {
  return (
    <button style={{backgroundColor: node.lock? "rgb(229 231 235 / 0.6)":"" }} onClick={onLock} className="iconButton text-lg">
      <LockIcon />
    </button>
  );
};
const DeleteButton = ({onDelete}:{onDelete:any}) => {

  return (
    <button
      onClick={onDelete}
      className="iconButton text-lg"
    >
      <DeleteIcon />
    </button>
  );
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

const LayerButton = ({onChangeLayerPosition }: { onChangeLayerPosition: any }) => {


  const content = () => (
    <div className="w-[200px]  px-2   text-sm">
      <Popover.Item onClick={()=>onChangeLayerPosition(2)} className="flex flex-row gap-3 hover:bg-gray-100 items-center cursor-pointer">
        <LayerTopIcon className="text-lg" /> <span>Bring to front</span>
      </Popover.Item>
      <Popover.Item onClick={()=>onChangeLayerPosition(1)} className="flex flex-row gap-3 hover:bg-gray-100 items-center  cursor-pointer">
        <LayerTopSingleIcon className="text-lg" /> <span>Bring forward</span>
      </Popover.Item>
      <Popover.Item onClick={()=>onChangeLayerPosition(-1)} className="flex flex-row gap-3 hover:bg-gray-100 items-center  cursor-pointer">
        <LayerBackSingleIcon className="text-lg" /> <span>Bring backward</span>
      </Popover.Item>
      <Popover.Item onClick={()=>onChangeLayerPosition(-2)} className="flex flex-row gap-3 hover:bg-gray-100 items-center  cursor-pointer">
        <LayerBackIcon className="text-lg" /> <span>Bring to back</span>
      </Popover.Item>
    </div>
  );
  return (
    <Popover
      placement="bottomEnd"
      content={content}
      className="iconButton text-lg"
    >
      <LayerIcon />
    </Popover>
  );
};
