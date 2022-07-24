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
} from "react-konva";
import { BoardAction, TNodeType } from "../../../state/slices/boardSlice";
import { useAppDispatch } from "../../../hooks";
const Shapes = () => {
  const dispatch=useAppDispatch()
  return (
    <SideContent>
      <div className="overflow-y-scroll flex flex-col">

    
      <div className="w-full min-h-[50px] py-3 px-3 bg-white rounded-lg flex flex-row gap-2 items-center overflow-y-scroll">
        <SearchIcon className="text-lg" />
        <input
          placeholder="Search shapes"
          className="w-full placeholder:text-[#6c757d] placeholder:font-light"
        />
        <CloseIcon className="text-lg transition-all hover:scale-110 cursor-pointer" />
      </div>
      <div className="flex flex-wrap gap-4 py-4 justify-center">
        {ListShapes.map((shape, i) => {
          return (
            <Stage
            key={i}
            onClick={(e)=>{
              dispatch(BoardAction.AddNode({type:shape.type,props:shape.props}))
            }}
              width={143}
              height={100}
              className="hover:scale-105 transition-all "
            >
              <Layer >{shape.render(shape.props)}</Layer>
            </Stage>
          );
        })}
      </div>
      </div>
    </SideContent>
  );
};

export default Shapes;

const w=100
const h=70
const propShape = {
  width: w,
  height: h,
  fill: "#bbc8cd",
  innerRadius: 38,
  outerRadius: 20,
  radius:34 ,
  radiusX:40, radiusY:20
};
const centerShape = {
  x: w / 2,
  y: h/ 2,
};
type TShape = {
  type: TNodeType;
  props: any;
  render: FunctionComponent<any>;
};
export const ListShapes: Array<TShape> = [


  {
    type: "rect",
    props: { width: w, height: h, fill: "#bbc8cd", },
    render: (e) => <Rect {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints:3,
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints:2,
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "arc",
    props: {
      ...propShape,
      ...centerShape,
      angle: 360,

    },
    render: (e) => <Arc {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides:7 
    },
    render: (e) => <RegularPolygon {...e} />,
  },
  {
    type: "arc",
    props: {
      ...propShape,
      ...centerShape,
      angle: 180,
    },
    render: (e) => <Arc {...e} />,
  },
  {
    type: "circle",
    props: {
      ...propShape,
      ...centerShape,
      angle: 180,
    },
    render: (e) => <Circle {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints:10,
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides:13 
    },
    render: (e) => <RegularPolygon {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints:5,
    },
    render: (e) => <Star {...e} />,
  },

  {
    type: "ellipse",
    props: {
      ...propShape,
      ...centerShape,
    
    },
    render: (e) => <Ellipse {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides:6 
    },
    render: (e) => <RegularPolygon {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints:4,
    },
    render: (e) => <Star {...e} />,
  },

  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides:12 
    },
    render: (e) => <RegularPolygon {...e} />,
  },

];
