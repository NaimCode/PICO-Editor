import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Arc,
  Circle,
  Ellipse,
  Group,
  Image,
  Layer,
  Rect,
  RegularPolygon,
  Stage,
  Star,
  Text,
} from "react-konva";
import { useElementSize } from "use-element-size";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TemplateQuery from "../../Query/templates";
import { SelectAppConfigScaling } from "../../state/slices/appConfigSlice";
import {
  BoardAction,
  SelectBoard,
  SelectBoardActifNode,
  SelectBoardNodes,
  TNode,
} from "../../state/slices/boardSlice";
import { DataAction } from "../../state/slices/dataSlice";
import { SelectUserRole } from "../../state/slices/userSlice";
import CustomSide from "./customSide";
import { useNodeEvent } from "./hooks";
import ShapeItem from "./shapeItem";

type BoardProps = {
  stageRef: RefObject<any>;
};
const Board = ({ stageRef }: BoardProps) => {
  const { nodes, nodeActif: actif, undo } = useAppSelector(SelectBoard);
  const scale = useAppSelector(SelectAppConfigScaling);
  const [dimension, setdimension] = useState<{
    width: number;
    height: number;
  }>();
  const { onClick, onMouseOver, onMouseLeave, onChange } = useNodeEvent();
  let data = {
    frameGroup: {
      x: 50,
      y: 100,
      width: 800,
      height: 300,
      strokeWidth: 10,
      stroke: "cyan",
    },
    fadeImage: { opacity: 0.3 },
  };

  const divW = scale < 100 ? 700 : 700 * scale;
  const w = "w-[" + divW + "]";
  const s = "scale-" + scale;
  const p = scale < 100 ? "p-0" : "pl-[" + 20 * scale + "]";

  return (
    <div
      className={`bg-[#f4f4f5] flex-grow flex flex-col overflow-hidden relative`}
    >
      <SaveTemplate nodes={nodes[undo]} />
      <CustomSide />
      <div
        className={`overflow-scroll flex-grow flex justify-center items-center`}
      >
        <Stage
          id="stage"
          ref={stageRef}
          width={nodes[undo][0].props.width}
          height={nodes[undo][0].props.height}
        >
          <Layer imageSmoothingEnabled>
            {nodes[undo].map((node, i) => {
              const strokeEnabled =
                actif == i ? true : node.props.strokeEnabled ? true : false;
              const props = {
                key: i,
                ...node.props,

                draggable: i != 0 ? !node.lock : false,
                // stroke: "#00a1ff",
                // strokeWidth: 2,
                // strokeEnabled: strokeEnabled,
                onClick: (e: any) => onClick(i),
                onMouseLeave: (e: any) => onMouseLeave(i),
                onMouseOver: (e: any) => onMouseOver(i),

                onDragEnd: (e: any) =>
                  onChange(i, {
                    x: e.target.x(),
                    y: e.target.y(),
                  }),
              };

              return (
                <ShapeItem
                  stageRef={stageRef}
                  key={i}
                  props={props}
                  isSelected={actif == i}
                  node={node}
                  index={i}
                  onChange={onChange}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Board;

const SaveTemplate = ({ nodes }: { nodes: Array<TNode> }) => {
  const dispatch = useAppDispatch();
  const role = useAppSelector(SelectUserRole);

  if (role != "user") {
    return (
      <button
        onClick={() => {
          //  TemplateQuery.AddTemplate(nodes,dispatch)
          dispatch(
            BoardAction.AddNode({
              type: "image",
              props: {
                src: "https://images.unsplash.com/photo-1659394754616-deb0f9c6ce22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
                width: 200,
                height: 100,
              },
            })
          );
        }}
        className="bg-yellow-300 z-30 absolute text-sm font-light  px-2 py-2 bottom-0 right-0 m-3 rounded-md drop-shadow-md"
      >
        Save template
      </button>
    );
  } else return <div></div>;
};
