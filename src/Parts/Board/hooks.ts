import { RefObject, useEffect, useRef, useState } from "react";

export const useBoardSize = ({
  ratio = "portrait",
}: {
  ratio?: "square" | "portrait" | "landscape";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isReadyStage, setisReadyStage] = useState<Boolean>(false);
  const [dimension, setdimension] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );
  useEffect(() => {
    if (ref.current) {
      setisReadyStage(true);
      let tempHeight: number = 0;
      let tempWidth: number = 0;
      switch (ratio) {
        case "portrait":
          tempHeight = Math.round(ref.current.clientHeight * 0.7);
          tempWidth = Math.round((tempHeight * 16) / 20);
          break;

        default:
          break;
      }
      setdimension({ width: tempWidth, height: tempHeight });
    }
  }, [ref]);

  return { isReadyStage, ref,dimension };
};
