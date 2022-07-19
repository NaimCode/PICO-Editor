import React from "react";
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
const Shapes = () => {
  return (
    <SideContent>
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
              width={143}
              height={100}
              className="hover:scale-105 transition-all "
            >
              <Layer>{shape}</Layer>
            </Stage>
          );
        })}
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
const ListShapes = [
  <Rect   width= {100}
  height={100}   fill= "#bbc8cd"   y={50 / 2} x={48 / 2}/>,
  <Star
    {...propShape}
    {...centerShape}
    numPoints={3}
    innerRadius={50}
    outerRadius={30}
  />,
  <Star
  {...propShape}
  {...centerShape}
  numPoints={2}
  innerRadius={50}
  outerRadius={30}
/>,

  <RegularPolygon {...propShape} {...centerShape} sides={7} radius={50} />,
  <Arc
    {...propShape}
    angle={360}
    innerRadius={50}
    outerRadius={30}
    {...centerShape}
  />,
  <Circle {...propShape} {...centerShape} />,
  <Star
    {...propShape}
    {...centerShape}
    numPoints={10}
    innerRadius={50}
    outerRadius={30}
  />,
  <RegularPolygon {...propShape} {...centerShape} sides={3} radius={50} />,
  <Ellipse {...propShape} {...centerShape} radiusX={60} radiusY={30} />,
  <Star
  {...propShape}
  {...centerShape}
  numPoints={4}
  innerRadius={50}
  outerRadius={30}
/>,
  <RegularPolygon {...propShape} {...centerShape} sides={6} radius={50} />,
  <RegularPolygon {...propShape} {...centerShape} sides={12} radius={50} />,
  <Star
    {...propShape}
    {...centerShape}
    numPoints={5}
    innerRadius={50}
    outerRadius={30}
  />,
];
