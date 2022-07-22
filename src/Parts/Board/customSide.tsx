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
  CgFormatLineHeight as TextLineIcon,
  CgColorBucket as FillIcon,
  CgDropOpacity as OpacityIcon,
} from "react-icons/cg";
import {
  BsIntersect as ShadowIcon,
  BsBorderWidth as StrokeIcon,
  BsBorderOuter as StrokeColorIcon,
  BsTypeBold as BoldIcon,
  BsTypeItalic as ItalicIcon,
  BsTypeUnderline as UnderlineIcon,
  BsTextareaT as TextColorIcon,
  BsLayers as LayerIcon,
  BsChevronDoubleDown as LayerBackIcon,
  BsChevronDoubleUp as LayerTopIcon,
  BsChevronDown as LayerBackSingleIcon,
  BsChevronUp as LayerTopSingleIcon,
  BsArrow90DegLeft as UndoIcon,
  BsArrow90DegRight as RedoIcon,
} from "react-icons/bs";
import {
  HiOutlineDuplicate as DuplicateIcon,
  HiOutlineLockClosed as LockIcon,
} from "react-icons/hi";
import { AiOutlineDelete as DeleteIcon } from "react-icons/ai";
import { Divider, Popover, Slider, Spacer, Tooltip } from "@geist-ui/core";
import { Link } from "react-router-dom";

const CustomSide = () => {
  const { nodeActif: actif, nodes, undo } = useAppSelector(SelectBoard);
  const node = useAppSelector(SelectBoardNodes)[actif!];
  const dispatch = useAppDispatch();

  return (
    <div className="h-[50px] min-h-[50px] w-full bg-white drop-shadow-sm flex flex-row items-center px-1 gap-1">
      <button
        style={{
          cursor: undo <= 0 ? "not-allowed" : "pointer",
          opacity: undo <= 0 ? 0.5 : 1,
        }}
        onClick={() => dispatch(BoardAction.UndoRedo("undo"))}
        className="transition-all text-lg rounded-md  text-black  w-[35px] h-[35px]  hover:bg-gray-200/60 flex items-center justify-center"
      >
        <UndoIcon />
      </button>
      <button
        style={{
          cursor: undo < nodes.length - 1 ? "pointer" : "not-allowed",
          opacity: undo < nodes.length - 1 ? 1 : 0.5,
        }}
        onClick={() => dispatch(BoardAction.UndoRedo("redo"))}
        className="transition-all text-lg rounded-md  text-black  w-[35px] h-[35px]  hover:bg-gray-200/60 flex items-center justify-center"
      >
        <RedoIcon />
      </button>
      <div className="w-[1px] h-[25px] bg-gray-300 mx-1"></div>
      {node && (
        <>
          <EditNode node={node} />
          <div className="w-[1px] h-[25px] bg-gray-300 mx-1"></div>
          <StrokeColorButton node={node} />
          <StrokeButton node={node} />
          {actif != 0 && (
            <>
              <ShadowButton node={node} />
            </>
          )}
          <div className="flex-grow"></div>
          {actif != 0 && (
            <>
              <div className="w-[1px] h-[25px] bg-gray-300 mx-1"></div>
              <LayerButton
                onChangeLayerPosition={(position: 1 | 2 | -1 | 2) => {
                  dispatch(BoardAction.UpdateShapeOrder(position));
                }}
              />
              <LockButton
                node={node}
                onLock={() => {
                  dispatch(BoardAction.LockShape());
                }}
              />
              <DuplicateButton
                onDuplice={() => {
                  dispatch(BoardAction.DuplicateShape({}));
                }}
              />
              <DeleteButton
                onDelete={() => {
                  dispatch(BoardAction.DeleteShape({}));
                }}
              />
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
      return (
        <>
          <ChangeImage node={node} />
        </>
      );
    case "text":
      return (
        <>
          <FillButton text node={node} />
          <OpacityButton node={node} />
          <div className="w-[1px] h-[25px] bg-gray-300 mx-1"></div>

          <TextButton node={node} />
        </>
      );
    default:
      return (
        <>
          <FillButton node={node} />
          <OpacityButton node={node} />
        </>
      );
  }
};

const ChangeImage = ({ node }: { node: TNode }) => {
  const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
   
      let reader = new FileReader();

      reader.onload = (e) => {
        console.log(node.props.width,node.props.height);
        dispatch(BoardAction.updateNodeProps({ value: { src:e.target?.result,scaleX:node.props.scaleX,scaleY:node.props.scaleY } }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const dispatch=useAppDispatch()
  return (
    <button className="relative overflow-hidden transition-all text-[12px] font-light rounded-md cursor-pointer text-black/80 h-[35px]  hover:bg-gray-200/60 flex flex-row gap-1 items-center justify-center p-1">
      <img
        src={node.props.src}
        alt=""
        className="w-[35px] h-full object-cover px-1 rounded-sm overflow-hidden"
      />
      Replace
      <input
        onChange={onFileChange}
        type={"file"}
        accept="image/*"
        className="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
      />
    </button>
  );
};

const TextButton = ({ node }: { node: TNode }) => {
  const dispatch = useAppDispatch();
  const handleTextStyleChange = (
    property: "textDecoration" | "fontVariant" | "fontStyle",
    value: string | undefined
  ) => {
    const obj: any = {};
    obj[property] = value;
    dispatch(BoardAction.updateNodeProps({ value: { ...obj } }));
  };
  return (
    <>
      <button
        onClick={() =>
          handleTextStyleChange(
            "fontVariant",
            node.props.fontVariant == "bold" ? undefined : "bold"
          )
        }
        style={{
          backgroundColor:
            node.props.fontVariant == "bold" ? "rgb(229 231 235 / 0.6)" : "",
        }}
        className="iconButton text-lg"
      >
        <BoldIcon />
      </button>
      <button
        onClick={() =>
          handleTextStyleChange(
            "fontStyle",
            node.props.fontStyle == "italic" ? undefined : "italic"
          )
        }
        style={{
          backgroundColor:
            node.props.fontStyle == "italic" ? "rgb(229 231 235 / 0.6)" : "",
        }}
        className="iconButton text-lg"
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() =>
          handleTextStyleChange(
            "textDecoration",
            node.props.textDecoration == "underline" ? undefined : "underline"
          )
        }
        style={{
          backgroundColor:
            node.props.textDecoration == "underline"
              ? "rgb(229 231 235 / 0.6)"
              : "",
        }}
        className="iconButton text-lg"
      >
        <UnderlineIcon />
      </button>
      <TextLineButton node={node} />
    </>
  );
};
const DuplicateButton = ({ onDuplice }: { onDuplice: any }) => {
  return (
    <button onClick={onDuplice} className="iconButton text-lg">
      <DuplicateIcon />
    </button>
  );
};
const LockButton = ({ onLock, node }: { onLock: any; node: TNode }) => {
  return (
    <button
      style={{ backgroundColor: node.lock ? "rgb(229 231 235 / 0.6)" : "" }}
      onClick={onLock}
      className="iconButton text-lg"
    >
      <LockIcon />
    </button>
  );
};
const DeleteButton = ({ onDelete }: { onDelete: any }) => {
  return (
    <button onClick={onDelete} className="iconButton text-lg">
      <DeleteIcon />
    </button>
  );
};
const FillButton = ({ node, text }: { node: TNode; text?: boolean }) => {
  const dispath = useAppDispatch();

  return (
    <div className="relative  flex flex-col items-center justify-center iconButton gap-[2px] rounded-sm text-lg">
      <input
        className="cursor-pointer rounded-md border-none bg-transparent opacity-0 w-[40px] h-[40px] absolute top-0 left-0"
        type={"color"}
        onChange={(e) =>
          dispath(
            BoardAction.updateNode({ property: "fill", value: e.target.value })
          )
        }
      />
      {text ? <TextColorIcon /> : <FillIcon />}
      <div
        style={{ backgroundColor: node.props.fill }}
        className={"h-[8px] w-[20px] rounded-md border-[1px]"}
      ></div>
    </div>
  );
};
const StrokeColorButton = ({ node }: { node: TNode }) => {
  const dispath = useAppDispatch();

  return (
    <div className="gap-[3px] text-sm relative  flex flex-col items-center justify-center transition-all rounded-md cursor-pointer text-black  w-[35px] h-[35px]  hover:bg-gray-200/60  ">
      <input
        className="cursor-pointer rounded-md border-none bg-transparent opacity-0 w-[40px] h-[40px] absolute top-0 left-0"
        type={"color"}
        onChange={(e) =>
          dispath(
            BoardAction.updateNode({
              property: "stroke",
              value: e.target.value,
            })
          )
        }
      />
      <StrokeColorIcon />
      <div
        style={{ backgroundColor: node.props.stroke }}
        className={"h-[8px] w-[20px] rounded-md border-[1px]"}
      ></div>
    </div>
  );
};
const StrokeButton = ({ node }: { node: TNode }) => {
  const dispath = useAppDispatch();

  const content = () => (
    <div className="w-[230px] px-5 -translate-y-1 flex flex-col gap-3">
      <span className="text-[12px] text-black/80">Border size</span>
      <Slider
        initialValue={node.props.strokeWidth ? node.props.strokeWidth * 3 : 0}
        onChange={(e) => {
          dispath(
            BoardAction.updateNode({ property: "strokeWidth", value: e / 3 })
          );
        }}
      />
    </div>
  );
  return (
    <Popover content={content} className="iconButton text-lg">
      <StrokeIcon />
    </Popover>
  );
};
const OpacityButton = ({ node }: { node: TNode }) => {
  const dispath = useAppDispatch();

  const content = () => (
    <div className="w-[230px] px-5 -translate-y-1 flex flex-col gap-3">
      <span className="text-[12px] text-black/80">Opacity</span>
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

const ShadowButton = ({ node }: { node: TNode }) => {
  const dispath = useAppDispatch();

  const content = () => (
    <div
      style={{ padding: "0 10px" }}
      className="w-[230px] px-5 -translate-y-1 flex flex-col gap-3"
    >
      <span className="text-[12px] text-black/80">Shadow blur</span>
      <Slider
        initialValue={node.props.shadowBlur ? node.props.shadowBlur : 0}
        onChange={(e) => {
          dispath(BoardAction.updateNodeProps({ value: { shadowBlur: e } }));
        }}
      />
      <Divider />
      <span className="text-[12px] text-black/80">Offset Y</span>
      <Slider
        min={-50}
        max={50}
        initialValue={
          node.props.shadowOffsetY ? node.props.shadowOffsetY * 2 : 0
        }
        onChange={(e) => {
          dispath(BoardAction.updateNodeProps({ value: { shadowOffsetY: e } }));
        }}
      />
      <Divider />
      <span className="text-[12px] text-black/80">Offset X</span>
      <Slider
        initialValue={
          node.props.shadowOffsetX ? node.props.shadowOffsetX * 2 : 0
        }
        min={-50}
        max={50}
        onChange={(e) =>
          dispath(BoardAction.updateNodeProps({ value: { shadowOffsetX: e } }))
        }
      />
    </div>
  );
  return (
    <Popover content={content} className="iconButton ">
      <ShadowIcon />
    </Popover>
  );
};

const TextLineButton = ({ node }: { node: TNode }) => {
  const dispath = useAppDispatch();

  const content = () => (
    <div
      style={{ padding: "0 10px" }}
      className="w-[230px] px-5 -translate-y-1 flex flex-col gap-3"
    >
      <span className="text-[12px] text-black/80">Line height</span>
      <Slider
        initialValue={node.props.lineHeight ? node.props.lineHeight * 4 : 0}
        onChange={(e) => {
          dispath(
            BoardAction.updateNodeProps({ value: { lineHeight: e / 4 } })
          );
        }}
      />
      <Divider />
      <span className="text-[12px] text-black/80">Letter spacing</span>
      <Slider
        min={-50}
        max={50}
        initialValue={node.props.letterSpacing ? node.props.letterSpacing : 0}
        onChange={(e) => {
          dispath(BoardAction.updateNodeProps({ value: { letterSpacing: e } }));
        }}
      />
    </div>
  );
  return (
    <Popover content={content} className="iconButton ">
      <TextLineIcon />
    </Popover>
  );
};

const LayerButton = ({
  onChangeLayerPosition,
}: {
  onChangeLayerPosition: any;
}) => {
  const content = () => (
    <div className="w-[200px]  px-2   text-sm">
      <Popover.Item
        onClick={() => onChangeLayerPosition(2)}
        className="flex flex-row gap-3 hover:bg-gray-100 items-center cursor-pointer"
      >
        <LayerTopIcon className="text-lg" /> <span>Bring to front</span>
      </Popover.Item>
      <Popover.Item
        onClick={() => onChangeLayerPosition(1)}
        className="flex flex-row gap-3 hover:bg-gray-100 items-center  cursor-pointer"
      >
        <LayerTopSingleIcon className="text-lg" /> <span>Bring forward</span>
      </Popover.Item>
      <Popover.Item
        onClick={() => onChangeLayerPosition(-1)}
        className="flex flex-row gap-3 hover:bg-gray-100 items-center  cursor-pointer"
      >
        <LayerBackSingleIcon className="text-lg" /> <span>Bring backward</span>
      </Popover.Item>
      <Popover.Item
        onClick={() => onChangeLayerPosition(-2)}
        className="flex flex-row gap-3 hover:bg-gray-100 items-center  cursor-pointer"
      >
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
