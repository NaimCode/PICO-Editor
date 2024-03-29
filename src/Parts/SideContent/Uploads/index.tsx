import { Loading } from "@geist-ui/core";
import { useEffect, useState } from "react";
import useImage from "use-image";
import SideContent from "..";
import { useAppDispatch } from '../../../hooks';
import { BoardAction } from "../../../state/slices/boardSlice";
import {CgLock as LockIcon} from 'react-icons/cg'
const Uploads = () => {

  return (
    <SideContent>
      <div className="flex flex-wrap gap-2 overflow-y-scroll">
        <div className=" text-white flex gap-2 flex-col items-center justify-center px-5 py-10 w-full rounded-lg">
            <LockIcon className="text-3xl " />
         <p className="font-thin opacity-60">To upload your assets, please</p>
         <p><button className="font-bold underline">Sign up</button> <span className="font-thin opacity-60"> or </span><button className="font-bold underline"> Log in</button></p>
        </div>
        {[

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
