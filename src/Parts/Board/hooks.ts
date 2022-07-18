import { RefObject, useEffect, useRef, useState } from "react";
import { STAGE_REF } from "../../App/global";
import { useAppDispatch } from "../../hooks";
import { BoardAction } from "../../state/slices/boardSlice";

export const useBoardSize = ({
  ratio = "portrait",
}: {
  ratio?: "square" | "portrait" | "landscape";
}) => {
  const ref = useRef(null);
  const dispatch=useAppDispatch()
  const [isReadyStage, setisReadyStage] = useState<Boolean>(false);
  const [dimension, setdimension] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );
  useEffect(() => {
   
  }, [ref]);

  return {ref};
};
