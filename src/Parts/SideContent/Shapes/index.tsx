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
      numPoints:3,
      innerRadius:50,
      outerRadius:30
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints:2,
      innerRadius:50,
      outerRadius:30
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides:7 ,radius:50 
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
      numPoints:10,
      innerRadius:50,
      outerRadius:30
    },
    render: (e) => <Star {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides:13 ,radius:50 
    },
    render: (e) => <RegularPolygon {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints:5,
      innerRadius:50,
      outerRadius:30
    },
    render: (e) => <Star {...e} />,
  },

  {
    type: "ellipse",
    props: {
      ...propShape,
      ...centerShape,
      radiusX:60, radiusY:30
    },
    render: (e) => <Ellipse {...e} />,
  },
  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides:6 ,radius:50 
    },
    render: (e) => <RegularPolygon {...e} />,
  },
  {
    type: "star",
    props: {
      ...propShape,
      ...centerShape,
      numPoints:4,
      innerRadius:50,
      outerRadius:30
    },
    render: (e) => <Star {...e} />,
  },

  {
    type: "regularPolygon",
    props: {
      ...propShape,
      ...centerShape,
      sides:12 ,radius:50 
    },
    render: (e) => <RegularPolygon {...e} />,
  },

];
