import React, { useEffect, useRef, useState } from "react";
import { Rect, Transformer } from "react-konva";
import { TNode } from "../../state/slices/boardSlice";

// const props = {
//   key: i,
//   ...node.props,
//   draggable:i!=0?true:false,
//   stroke: "#00a1ff",
//   strokeWidth: 4,
//   strokeEnabled: strokeEnabled,
//   onClick: (e: any) => onClick(i),
//   onMouseLeave: (e: any) => onMouseLeave(i),
//   onMouseOver: (e: any) => onMouseOver(i),
// };
type ShapeItemProps = {
  isSelected: boolean;
  props: any;
  node:TNode,
  index:number,
  onChange:Function
};
const ShapeItem = ({ props, isSelected,node, index}: ShapeItemProps) => {
  const [transforming, setTransforming] = useState(false);

  const shapeRef = useRef();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current?.nodes([shapeRef.current]);
      // trRef.current.setRotation(shapeRef.current.getAbsoluteRotation());
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect ref={shapeRef} {...props} onTransformEnd={(e)=>{
         console.log("Transforming");
        console.log(e);
        
      }}/>
      {isSelected && index!=0 && (
        <Transformer
          ref={trRef}
          keepRatio={true}
        //anchorFill="#00a1ff"
        borderStroke="#00a1ff"
        borderStrokeWidth={2}
        centeredScaling
        anchorCornerRadius={2}
          flipEnabled={true}
          useSingleNodeRotation={true}
          // enabledAnchors={[
          //   "top-left",
          //   "center-left",
          //   "top-right",
          //   "bottom-left",
          //   "bottom-right",
          // ]}
        />
      )}
    </>
  );
};

export default ShapeItem;
