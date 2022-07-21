import React, { FunctionComponent } from "react";
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
        fontSize:20,
        fill:"black",
        text:"Add a header"
    }
    dispatch(BoardAction.AddNode({type:"text",props:communProps}))
  }
  return (
    <SideContent>
      <span className="text-white text-sm font-semibold">Basic text</span>
      <div className="flex flex-col gap-3 p-2">
        <button style={{fontSize:30,fontWeight: 600 }} onClick={()=>handleAddText({})} className="transition-all py-4 px-3 text-3xl font-semibold bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg">
          Add a header
        </button>
        <button className="transition-all py-4 px-3 text-xl bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg">
          Add a subheader
        </button>
        <button className="transition-all font-light py-3 px-3 bg-[#1f2021] hover:bg-[#292929]/50  text-left text-white border-2 border-[#292929] rounded-lg">
          Add a paragraph
        </button>
      </div>
      {/* <div className="flex flex-col gap-2">
        {[1,2,3].map((shape, i) => {
          return (
            <Stage
            key={i}
            // onClick={(e)=>{
            //   dispatch(BoardAction.AddNode({type:shape.type,props:shape.props}))
            // }}
            
              width={350}
              height={40}
              className="hover:scale-105 transition-all "
            >
              <Layer >
                <Text text="Add Header"/>
              </Layer>
            </Stage>
          );
        })}
      </div> */}
    </SideContent>
  );
};

export default Texts;

const propShape = {
  width: 143,
  height: 100,
  fill: "#bbc8cd",
};
const centerShape = {
  x: 143 / 2,
  y: 100 / 2,
};
type TShape = {
  type: TNodeType;
  props: any;
  render: FunctionComponent<any>;
};
const ListShapes: Array<TShape> = [
  {
    type: "rect",
    props: { width: 100, height: 100, fill: "#bbc8cd", y: 50 / 2, x: 48 / 2 },
    render: (e) => <Rect {...e} />,
  },
  {
    type: "arc",
    props: {
      ...propShape,
      ...centerShape,
      angle: 360,
      innerRadius: 50,
      outerRadius: 30,
    },
    render: (e) => <Arc {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints: 3,
      innerRadius: 50,
      outerRadius: 30,
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints: 2,
      innerRadius: 50,
      outerRadius: 30,
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides: 7,
      radius: 50,
    },
    render: (e) => <RegularPolygon {...e} />,
  },
  {
    type: "arc",
    props: {
      ...propShape,
      ...centerShape,
      angle: 180,

      innerRadius: 50,
      outerRadius: 30,
    },
    render: (e) => <Arc {...e} />,
  },
  {
    type: "circle",
    props: {
      ...propShape,
      ...centerShape,
      angle: 180,
      innerRadius: 50,
      outerRadius: 30,
    },
    render: (e) => <Circle {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints: 10,
      innerRadius: 50,
      outerRadius: 30,
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides: 13,
      radius: 50,
    },
    render: (e) => <RegularPolygon {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints: 5,
      innerRadius: 50,
      outerRadius: 30,
    },
    render: (e) => <Star {...e} />,
  },

  {
    type: "ellipse",
    props: {
      ...propShape,
      ...centerShape,
      radiusX: 60,
      radiusY: 30,
    },
    render: (e) => <Ellipse {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides: 6,
      radius: 50,
    },
    render: (e) => <RegularPolygon {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints: 4,
      innerRadius: 50,
      outerRadius: 30,
    },
    render: (e) => <Star {...e} />,
  },

  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides: 12,
      radius: 50,
    },
    render: (e) => <RegularPolygon {...e} />,
  },
];
