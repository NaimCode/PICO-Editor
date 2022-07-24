import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif, Grid, SearchBar, SearchContext } from "@giphy/react-components";
import React, { useContext, useEffect, useState } from "react";
import { GrClose as CloseIcon, GrPrevious as MoreIcon } from "react-icons/gr";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import { BoardAction } from "../../../../state/slices/boardSlice";
import { RiSearch2Line as SearchIcon } from "react-icons/ri";
import { gf, KEY_GIPHY } from "../../../../config";

const Gifs = () => {
  //useState search
  const [search, setSearch] = useState<string>("");
  //useState data array
  const [data, setData] = useState<{ searching: boolean; gifs: any }>();
  const state = {
    searchLimit: 50,
    searching: false,
    searched: false,
    gifs: [],
    url: "https://api.giphy.com/v1/gifs/search?",
    apiKey:KEY_GIPHY,
  };
  //useeffect get gifs from giphy
  useEffect(() => {
    fetchGifs(search);
  }, [search]);

  const fetchGifs = (search: string) => {
    fetch(
      `${state.url}api_key=${state.apiKey}&q=${search}&limit=${state.searchLimit}`
    )
      .then((res) => res.json())
      .then((data) => setData({ gifs: data.data, searching: false }));
  };
  //dispatch
  const dispatch = useAppDispatch();
  return (
    <div className="overflow-x-scroll">
      <div className="flex flex-col sticky top-0 left-0 z-10 backdrop-blur-md bg-[#1c1e1f]/80 items-center  text-lg  py-3 gap-3 px-2">
        <div className="w-full min-h-[50px] py-3 px-2 bg-white rounded-lg flex flex-row gap-2 items-center overflow-y-scroll">
          <Link
            to={"/elements"}
            className="transition-all  rounded-md  h-full flex justify-center items-center text-[#656565] hover:scale-105"
          >
            <MoreIcon />
          </Link>
          <input
            placeholder="Search gifs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full placeholder:text-sm text-sm placeholder:text-[#6c757d] placeholder:font-light"
          />
         <button onClick={()=>{
            setSearch("");
         }}>
         <CloseIcon className="text-lg transition-all hover:scale-110 cursor-pointer" />
         </button>
        </div>
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
          {search == "" ? (
            <Grid
              onGifClick={(e) => {
                console.log(e);
                dispatch(
                  BoardAction.AddNode({
                    type: "image",
                    props: {
                      src: (e.images.downsized_medium || e.images.fixed_width)
                        .url,
                    },
                  })
                );
              }}
              backgroundColor="#1e2021"
              noLink
              hideAttribution
              className="overflow-y-scroll"
              columns={2}
              width={310}
              fetchGifs={(offset: number) => gf.trending({ offset, limit: 10 })}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {data?.gifs.map((gif: any, i: number) => (
                <div className="cursor-pointer flex justify-center items-center">
                    <Gif
                  hideAttribution
                  noLink
                  onGifClick={(e) => {
                    //dispatch
                    dispatch(
                      BoardAction.AddNode({
                        type: "image",
                        props: {
                          src: (
                            e.images.downsized_medium || e.images.fixed_width
                          ).url,
                        },
                      })
                    );
                  }}
                  key={i}
                  gif={gif}
                  width={150}
                />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gifs;

const Search = () => {
  //hook to handle giphy search
  return <SearchBar />;
};
