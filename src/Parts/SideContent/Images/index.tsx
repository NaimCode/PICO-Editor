import { Loading } from "@geist-ui/core";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoSearchCircleOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import useImage from "use-image";
import SideContent from "..";
import { useAppDispatch } from '../../../hooks';
import { BoardAction } from "../../../state/slices/boardSlice";
import { GrClose as CloseIcon } from "react-icons/gr";
//setting up unsplash api

//setting up unsplash call api
// const searchImages = async ({query,limit}:{query: string,limit:number}) => {
//   const response = await fetch(
//     `https://api.unsplash.com/search/photos?per_page=${limit}&query=${query}&client_id=${import.meta.env.VITE_APP_UNSPLASH_ACCESS}`
//   );
//   const data = await response.json();
//   console.log(data);
  
//   return data.results;
// }
//setting up unsplash call api random
const randomImages = async ({limit,query}:{limit:number,query:string}) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=${limit}&query=${query}&client_id=${import.meta.env.VITE_APP_UNSPLASH_ACCESS}`
  );
  const data = await response.json();
  console.log(data);
  return data.errors?[]:data;
}
const Images = () => {
  const [images, setImages] = useState<any[]>([]);
  //search state
  const [search, setSearch] = useState<string>("");

useEffect(() => {
  //searchImages({query:"nature",limit:20}).then(setImages);
if(search.length>=3||search.length===0){
  randomImages({limit:30,query:search}).then(setImages);
}
  
} ,[search])
  return (
    <SideContent>
      <div className="relative flex flex-wrap gap-2 overflow-y-scroll">
      <div className="flex flex-col w-full sticky top-0 left-0 z-10 backdrop-blur-md bg-[#1c1e1f]/80 items-center  text-lg  pb-3 gap-3">
      <div className="w-full min-h-[50px] py-3 px-3 bg-white rounded-lg flex flex-row gap-3 items-center overflow-y-scroll">
          {/* search icon from react-icons*/}
          <RiSearch2Line className="text-lg" />

    
          <input
            placeholder="Search images"
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
        </div>
        {images.map((n, i) => (
          <ImageShape key={i} src={n.urls.small} image={n} />
        ))}
      </div>
    </SideContent>
  );
};

export default Images;

const ImageShape = ({ src,image }: { src: string,image?:any }) => {
  const [img, state] = useImage(src);
const dispatch=useAppDispatch()
const getDimension = (img: any) => {
  var height: number;
  var width: number;

  if (img.height > 500 && img.width > 500) {
    const x =
      (img.width > img.height ? img.width : img.height) / 500;
    height = img.height / x;
    width = img.width / x;
  } else {
    height = img.height;
    width = img.width;
  }
  return img?{ height, width }:{};
}
  return img ? (
    <button
      onClick={() => {
        dispatch(BoardAction.AddNode({ type: "image", props: {  ...getDimension(image), src:image?image.urls.regular:src} }));
      }}
      className="w-[48%] h-auto relative"
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
