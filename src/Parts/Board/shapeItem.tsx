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
  stageRef: any;
  onChange: Function;
};
const ShapeItem = ({
  props,

  isSelected,
  node,
  index,
  stageRef,
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
      if (node.type == "text") {
      } else {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const x = node.x();
        const y = node.y();
        const rotation = node.rotation();
        const skewX = node.skewX();
        const skewY = node.skewY();
        const width = node.width();
        const height = node.height();

        onChange(index, {
          x,
          y,
          width,
          height,

          scaleX,
          scaleY,
          skewX,
          skewY,
          rotation,
        });
      }
    },
  };

  return (
    <>
      {node.type == "text" && (
        <Text
          onDblClick={() => {
            trRef.current.hide();
            shapeRef.current.hide();
            const textPosition = shapeRef.current.absolutePosition();
            const areaPosition = {
              x: stageRef.current.container().offsetLeft + textPosition.x,
              y: stageRef.current.container().offsetTop + textPosition.y + 68,
            };
            const textnode = shapeRef.current;
            const textarea = document.createElement("textarea");
            
            document.body.appendChild(textarea);
            textarea.value = props.text;
            textarea.style.position = "absolute";
            textarea.style.top = areaPosition.y + "px";
            textarea.style.left = areaPosition.x + "px";
            //textarea.style="border-[2px] border-[#00a1ff]"
            textarea.style.width =
              textnode.width() - textnode.padding() * 2 + "px";
            textarea.style.height =
              textnode.height() - textnode.padding() * 2 + "px";
            textarea.style.fontSize = textnode.fontSize() + "px";
            textarea.style.background = "none";
            textarea.style.border = "none";

            textarea.style.padding = "0px";
            textarea.style.margin = "0px";
            textarea.style.overflow = "hidden";
            textarea.style.outline = "none";
            textarea.style.resize = "none";
            textarea.style.fontStyle = textnode.fontStyle();
            textarea.style.fontWeight = textnode.fontVariant();
            textarea.style.lineHeight = textnode.lineHeight();
            textarea.style.letterSpacing = textnode.letterSpacing();
            textarea.style.fontFamily = textnode.fontFamily();
            textarea.style.transformOrigin = "left top";
            textarea.style.textAlign = textnode.align();
            textarea.style.color = textnode.fill();
            const rotation = textnode.rotation();
            let transform = "";
            if (rotation) {
              transform += "rotationZ(" + rotation + "deg)";
            }
            let px = 0;
            const isFirefox =
              navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            if (isFirefox) {
              px += 2 + Math.round(textnode.fontSize() / 20);
            }
            transform += "translateY(-" + px + "px)";
            textarea.style.transform = transform;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + 3 + "px";

            textarea.focus();
            function removeTextarea() {
              textarea.parentNode?.removeChild(textarea);
              window.removeEventListener("click", handleOutsideClick);
              textnode.show();
             trRef.current.show();
              trRef.current.forceUpdate();
            }

            function setTextareaWidth(newWidth: number | undefined) {
              if (!newWidth) {
                newWidth = textnode.placeholder.length + textnode.fontSize();
              }
              newWidth = (newWidth || 0) + 1;
              textarea.style.width = newWidth + "px";

              // let isSafari '/^((?!chrome|android).)*safari/i'.test(navigator.userAgent)
            }
            textarea.addEventListener("keydown", function (e) {
              if (e.key === "13" && !e.shiftKey) {
              
                onChange(index, {text:textarea.value
                });
                removeTextarea();
              }
              if (e.code === "27") {
                removeTextarea();
              }
            });
            textarea.addEventListener("keydown", function (e) {
              const scale = textnode.getAbsoluteScale().x;
              setTextareaWidth(textnode.width() + scale);
              textarea.style.height = "auto";
              textarea.style.height =
                textarea.scrollHeight + textnode.fontSize() + "px";
            });
            function handleOutsideClick(e: any) {
              if (e.target !== textarea) {

                onChange(index, {text:textarea.value
                });
                removeTextarea();
              }
            }
            setTimeout(() => {
              window.addEventListener('click',handleOutsideClick)
            });
          }}
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

      {isSelected && index != 0 && (
        <Transformer
          ref={trRef}
          // keepRatio={node.type == "image"|| node.type == "text" ?true:false}
          //anchorFill="#00a1ff"
          borderStroke="#00a1ff"
          borderStrokeWidth={2}
          resizeEnabled={!node.lock}
          rotateEnabled={!node.lock}
          boundBoxFunc={function (oldBox: Box, newBox: Box) {
            newBox.width = Math.max(50, newBox.width);
            //  newBox.height=Math.max(10,newBox.height)
            return newBox;
          }}
          anchorCornerRadius={2}
          flipEnabled={true}
          useSingleNodeRotation={true}
          onTransform={() => {
            if (node.type == "text") {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              const width = node.width();
              const height = node.height();

              onChange(index, {
                width: width * scaleX,
                height: height * scaleY,

                scaleX: 1,
                scaleY: 1,
              });
            }
          }}
          // enabledAnchors={node.type == "text"
          // // ||node.type =="image"
          // ?[
          //   "top-left",
          //   "top-right",
          //   "bottom-left",
          //   "bottom-right",
          // ]:undefined}
        />
      )}
    </>
  );
};

export default ShapeItem;

const ImageShape = ({ props }: { props: any }) => {
  const [img] = useImage(props.src);

  return img ? (
    <Image lineCap="square" lineJoin="bevel" image={img} {...props} />
  ) : (
    <Rect />
  );
};
