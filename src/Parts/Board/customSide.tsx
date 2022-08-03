import React, { useEffect, useRef, useState } from "react";
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
  BsPlus as PlusIcon,
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
import { BiImageAdd as AddImageIcon } from "react-icons/bi";
import {
  Divider,
  Popover,
  Select,
  Slider,
  Spacer,
  Tooltip,
} from "@geist-ui/core";
import { Link } from "react-router-dom";
import { Fonts } from "../../Data/fonts";

const CustomSide = () => {
  const { nodeActif: actif, nodes, undo } = useAppSelector(SelectBoard);
  const node = useAppSelector(SelectBoardNodes)[actif!];
  const dispatch = useAppDispatch();

  return (
    <div className="h-[50px] min-h-[50px] w-full bg-white drop-shadow-sm flex flex-row items-center px-1 gap-1 overflow-x-scroll">
      <button
        style={{
          cursor: undo <= 0 ? "not-allowed" : "pointer",
          opacity: undo <= 0 ? 0.5 : 1,
        }}
        onClick={() => dispatch(BoardAction.UndoRedo("undo"))}
        className="transition-all text-lg rounded-md  text-black  min-w-[35px] h-[35px]  hover:bg-gray-200/60 flex items-center justify-center"
      >
        <UndoIcon />
      </button>
      <button
        style={{
          cursor: undo < nodes.length - 1 ? "pointer" : "not-allowed",
          opacity: undo < nodes.length - 1 ? 1 : 0.5,
        }}
        onClick={() => dispatch(BoardAction.UndoRedo("redo"))}
        className="transition-all text-lg rounded-md  text-black  min-w-[35px] h-[35px]  hover:bg-gray-200/60 flex items-center justify-center"
      >
        <RedoIcon />
      </button>
      <div className="w-[1px] h-[25px] bg-gray-300 mx-1"></div>
      {(!node || (node.type != "image" && node.type != "text")) && (
        <>
          <AddImageButton node={node} />
          <div className="w-[1px] h-[25px] bg-gray-300 mx-1"></div>
        </>
      )}

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
          <FontsButton node={node} />
          <ChangeFontSize node={node} />
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

const AddImageButton = ({ node }: { node: TNode }) => {
  const dispath = useAppDispatch();
  const [img, setimg] = useState("");
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var _URL = window.URL || window.webkitURL;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      //Read the contents of Image File.
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        var image: any = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target?.result;

        //Validate the File Height and Width.
        image.onload = function () {
          var height: number;
          var width: number;

          if (this.height > 500 && this.width > 500) {
            const x =
              (this.width > this.height ? this.width : this.height) / 500;
            height = this.height / x;
            width = this.width / x;
          } else {
            height = this.height;
            width = this.width;
          }
          dispatch(
            BoardAction.AddNode({
              type: "image",
              props: {
                src: e.target?.result,
                width,
                height,
              },
            })
          );
        };
      };
      // var imgt= new Image();
      // var objectUrl = _URL.createObjectURL(event.target.files[0]);
      // imgt.onload = function () {
      //     alert(imgt.width + " " + imgt.height);
      //     _URL.revokeObjectURL(objectUrl);
      //     let reader = new FileReader();

      // reader.onload = (e) => {

      //   console.log(reader);
      //   dispatch(
      //     BoardAction.AddNode({type:"image",
      //       props: {
      //         src: e.target?.result,
      //       },
      //     })
      //   );
      // };
      // reader.readAsDataURL(event.target.files[0]!);
      // };
    }
  };
  const dispatch = useAppDispatch();
  const content = () => (
    <div className="w-[300px] px-5 -translate-y-1 flex flex-col gap-3">
      <span className="text-[12px] text-black/80">Add image</span>
      <div className="flex flex-row gap-2">
        <input
          value={img}
          onChange={(e) => {
            setimg(e.target.value);
          }}
          placeholder="https://....."
          name=""
          id=""
          className="flex-grow border-[1px] border-gray-300 px-2 py-1 rounded-md placeholder:text-sm font-light text-sm placeholder:font-light text-ellipsis"
        />
        <button
          onClick={() => {
            if (img != "") {
              dispath(
                BoardAction.AddNode({ type: "image", props: { src: img } })
              );
            }
          }}
          className={`${
            img == "" ? "opacity-40 cursor-not-allowed" : "opacity-100"
          } transition-all py-1 px-2 rounded-md bg-primary text-[12px] font-light text-white`}
        >
          add
        </button>
      </div>

      <button className="relative border border-primary text-primary text-sm rounded-md py-2">
        From local
        <div className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer bg-red-300 flex justify-center items-center">
          <input onChange={onFileChange} type={"file"} accept="image/*" />
        </div>
      </button>
    </div>
  );
  return (
    <Popover
      placement="bottomStart"
      content={content}
      className="iconButton text-lg"
    >
      <button className="relative text-xl overflow-hidden transition-all iconButton">
        <AddImageIcon />
      </button>
    </Popover>
  );
};

const ChangeFontSize = ({ node }: { node: TNode }) => {
  const [value, setvalue] = useState(node.props.fontSize);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row rounded-md border-[1px] h-[30px] border-gray-200/60  items-center">
      <button
        onClick={() => {
          let v = parseInt(value);
          if (v && v != 0) {
            setvalue(v - 1);
            dispatch(
              BoardAction.updateNodeProps({ value: { fontSize: v - 1 } })
            );
          }
        }}
        className="hover:bg-gray-200/60 text-lg font-semibold w-[20px] border-r-[1px] border-gray-200/60"
      >
        -
      </button>
      <input
        onChange={(e) => {
          // if (value) {

          // }
          const v = parseInt(e.target.value);
          setvalue(e.target.value);
          if (v) {
            dispatch(BoardAction.updateNodeProps({ value: { fontSize: v } }));
          } else {
            if (e.target.value == "") {
            }
          }
        }}
        value={value}
        type="text"
        name=""
        id=""
        className="w-[35px] text-center text-sm font-sans"
      />
      <button
        onClick={() => {
          let v = parseInt(value);
          if (v || value == "") {
            v = (v || 0) + 1;
            setvalue(v);
            dispatch(BoardAction.updateNodeProps({ value: { fontSize: v } }));
          }
        }}
        className="hover:bg-gray-200/60 text-lg  w-[20px] border-l-[1px] border-gray-200/60"
      >
        +
      </button>
    </div>
  );
};
const ChangeImage = ({ node }: { node: TNode }) => {
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        dispatch(
          BoardAction.updateNodeProps({
            value: {
              src: e.target?.result,
              scaleX: node.props.scaleX,
              scaleY: node.props.scaleY,
            },
          })
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const dispatch = useAppDispatch();
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

const FontsButton = ({ node }: { node: TNode }) => {
  const dispatch = useAppDispatch();
  console.log(node.props.fontFamily);

  return (
    <Select
      onChange={(e) => {
        dispatch(BoardAction.updateNodeProps({ value: { fontFamily: e } }));
      }}
      width={"100px"}
      disableMatchWidth
      initialValue={node.props.fontFamily || "Roboto, sans-serif"}
      pure
      className="border-[1px] border-gray-200/60 h-[30px] text-ellipsis px-1"
    >
      {Fonts.map((f, i) => {
        return (
          <Select.Option key={i} style={{ fontFamily: f }} value={f}>
            {f.split(",")[0]}
          </Select.Option>
        );
      })}
    </Select>
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
        initialValue={node.props.lineHeight ? node.props.lineHeight * 20 : 0}
        onChange={(e) => {
          dispath(
            BoardAction.updateNodeProps({ value: { lineHeight: e / 20 } })
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
