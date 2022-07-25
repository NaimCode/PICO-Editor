import { Box } from "konva/lib/shapes/Transformer";
import React, { useEffect, useRef, useState } from "react";
import {
  Arc,
  Circle,
  Ellipse,
  Image,
  Rect,
  RegularPolygon,
  Star,
  Text,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import { TNode } from "../../../state/slices/boardSlice";
import { applyCrop } from "../../Board/shapeItem";


type TShapeItemPropsReadOnly = {


  node: TNode;

};
const ShapeItemReadOnly = ({
 node
}: TShapeItemPropsReadOnly) => {
    const shapeRef = useRef<any>();
    const shapeProps={...node.props,ref:shapeRef}

  return (
    <>
      {node.type == "text" && (
        <Text
         
          {...shapeProps}
        />
      )}
      {node.type == "image" && <ImageShape props={shapeProps} />}
      {(node.type == "rect" || node.type == "layer") && (
        <Rect {...shapeProps} />
      )}
      {node.type == "arc" && <Arc {...shapeProps} />}
      {node.type == "star" && <Star {...shapeProps} />}
      {node.type == "ellipse" && <Ellipse {...shapeProps} />}
      {node.type == "regularPolygon" && <RegularPolygon {...shapeProps} />}
      {node.type == "circle" && <Circle {...shapeProps} />}

    </>
  );
};

export default ShapeItemReadOnly;

const ImageShape = ({ props }: { props: any }) => {
  const [imgSrc] = useImage(props.src);

  useEffect(() => {
    if (imgSrc) {
      const img = props.ref.current;
      
      applyCrop(img, img.getAttr("lastCropUsed"));
    }
  }, [imgSrc, props]);

  return imgSrc ? (
    <Image
      lineCap="square"
      lineJoin="bevel"
    
      image={imgSrc}
      {...props}
    />
  ) : (
    <Rect />
  );
};


