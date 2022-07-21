import React, { useEffect, useRef, useState } from "react";
import {
  Arc,
  Circle,
  Ellipse,
  Rect,
  RegularPolygon,
  Star,
  Text,
  Transformer,
} from "react-konva";
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
  node: TNode;
  index: number;
  onChange: Function;
};
const ShapeItem = ({
  props,
  isSelected,
  node,
  index,
  onChange,
}: ShapeItemProps) => {
  const [transforming, setTransforming] = useState(false);

  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current?.nodes([shapeRef.current]);
      // trRef.current.setRotation(shapeRef.current.getAbsoluteRotation());
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  const shapeProps = {

    ...props,
    
    ref: shapeRef,

    onTransformEnd: (e: any) => {
      const node = shapeRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      const x = node.x();
      const y = node.y();
      const rotation = node.rotation();
      const skewX = node.skewX();
      const skewY = node.skewY();
      onChange(index, {
        x,
        y,
        scaleX,
        scaleY,
        skewX,
        skewY,
        rotation,
      });
    },
  };

  return (
    <>
      {node.type == "text" && <Text{...shapeProps} />}
      {(node.type == "rect" ||node.type == "layer") && <Rect {...shapeProps} />}
      {node.type == "arc" && <Arc {...shapeProps} />}
      {node.type == "star" && <Star {...shapeProps} />}
      {node.type == "ellipse" && <Ellipse {...shapeProps} />}
      {node.type == "regularPolygon" && <RegularPolygon {...shapeProps} />}
      {node.type == "circle" && <Circle {...shapeProps} />}
 
      {isSelected && index != 0 && (
        <Transformer
          ref={trRef}
       
          keepRatio={true}
          //anchorFill="#00a1ff"
          borderStroke="#00a1ff"
          borderStrokeWidth={2}
          resizeEnabled={!node.lock}
          rotateEnabled={!node.lock}
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
