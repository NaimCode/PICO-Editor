import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import React from "react";

import { FaChevronLeft as MoreIcon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import { BoardAction } from "../../../../state/slices/boardSlice";

const gf = new GiphyFetch("C8MOnqzxJ9mcZ0jUBAmY9TNSRNv5dv8e");

const Emoji3D = () => {
  const giphy = (offset: number) => gf.emoji({ offset, limit: 40 });
  //dispatch
  const dispatch = useAppDispatch();
  return (
    <div className="overflow-x-scroll -translate-y-5">
      <div className="flex flex-row sticky top-0 left-0 z-10 backdrop-blur-md bg-[#1c1e1f]/90 items-center h-[33px]  text-lg  py-7 ">
        <Link to={"/elements"} className="transition-all  rounded-md w-[33px] h-full flex justify-center items-center text-[#656565] hover:text-white/70 hover:scale-105">
          <MoreIcon />
        </Link>
        <div className="flex-grow flex justify-center items-center h-[20px]">
          <img
            src="/giphy.png"
            alt=""
            className="object-contains h-full -translate-x-5"
          />
        </div>
      </div>
      <div>
       <div className="cursor-pointer">
       <Grid
          onGifClick={(e) => {
            console.log(e);
            dispatch(
              BoardAction.AddNode({
                type: "image",
                props: {
                  src: (e.images.downsized_medium || e.images.fixed_width).url,
                  width:100,
                  height:100,
                },
              })
            );
          }}
          backgroundColor="#1e2021"
          noLink
          hideAttribution
          className="overflow-y-scroll"
          columns={3}
          width={310}
          fetchGifs={giphy}
        />
       </div>
      </div>
    </div>
  );
};

export default Emoji3D;
