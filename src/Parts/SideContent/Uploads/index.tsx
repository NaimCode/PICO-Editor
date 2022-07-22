import { Loading } from "@geist-ui/core";
import { useEffect, useState } from "react";
import useImage from "use-image";
import SideContent from "..";
import { useAppDispatch } from '../../../hooks';
import { BoardAction } from "../../../state/slices/boardSlice";

const Uploads = () => {

  return (
    <SideContent>
      <div className="flex flex-wrap gap-2 overflow-y-scroll">
        {[
          "/1.jpg",
          "/2.jpg",
          "/3.jpg",
          "/4.jpg",
          "/5.jpg",
          "/6.jpg",
          "/7.jpg",
          "/8.jpg",
          "/9.jpg",
        ].map((n, i) => (
          <ImageShape key={i} src={n} />
        ))}
      </div>
    </SideContent>
  );
};

export default Uploads;

const ImageShape = ({ src }: { src: string }) => {
  const [img, state] = useImage(src);
const dispatch=useAppDispatch()
  return img ? (
    <button
      onClick={() => {
        dispatch(BoardAction.AddNode({ type: "image", props: {src} }));
      }}
      className="w-[45%] h-auto relative"
    >
      <img
        src={src}
        loading="lazy"
        className="w-full h-full object-cover "
      />
      <div className="transition-all absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-25 bg-black"></div>
    </button>
  ) : (
    <div>
      <Loading />
    </div>
  );
};
