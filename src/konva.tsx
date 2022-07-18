import { useEffect, useRef, useState } from "react";
import { Image, Layer, Rect, Stage, Text, Transformer } from "react-konva";
import useImage from "use-image";

export default function KonvaPage() {
  const container = useRef<HTMLDivElement>(null);
  const [isReady, setisReady] = useState(false);
  const [scaleX, setscaleX] = useState(1);
  const [scaleY, setscaleY] = useState(1);
  const [image] = useImage("/1.jpg");
  //hooks
  useEffect(() => {
    if (container.current) setisReady(true);
  }, [container]);

  //Renderer
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-blue-600 transition-all">
      <div className="flex flex-row gap-4 py-2">
        <button
          onClick={() => {
            setscaleX(scaleX - 0.2);
            setscaleY(scaleY - 0.2);
          }}
          className="bg-amber-300 text-black py-1 px-3 rounded-sm"
        >
          -
        </button>
        <button
          onClick={() => {
            setscaleX(scaleX + 0.2);
            setscaleY(scaleY + 0.2);
          }}
          className="bg-green-300 text-black py-1 px-3 rounded-sm"
        >
          +
        </button>
      </div>
      <div ref={container} className="w-[80vw] h-[80vh]">
        {isReady && (
          <Stage
            scaleX={scaleX}
            scaleY={scaleY}
            width={300}
            height={700}
          >
            <Layer>
              <Rect
                width={5000}
                height={5000}
                x={0}
                y={0}
          
                fill={"white"}
                onClick={(e) => {
                  console.log(e);
                }}
              />
             
            </Layer>
            <Layer>
              <Rect
                width={100}
                height={40}
                onTransform={(e)=>console.log(e)
                }
                draggable
                x={253}
                y={267}
                //onDragMove={(e)=>console.log(e)}
                onDragEnd={(e) => console.log(e.target._lastPos)}
                // onDragStart={(e)=>console.log(e)}
                fill={"orange"}
                onClick={(e) => {
                  console.log(e);
                }}
              />
              <Rect
                width={100}
                height={40}
                x={30}
                y={30}
                
                draggable
                fill={"blue"}
                onClick={(e) => {
                  console.log(e);
                }}
              />
           
              <Text     draggable text="Hello world konva" />
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
}
