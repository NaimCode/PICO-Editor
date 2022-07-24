import { GiphyFetch } from "@giphy/js-fetch-api"
import { Carousel, Grid, SearchBar } from "@giphy/react-components"
import { Link } from "react-router-dom"
import {FaChevronRight as MoreIcon} from "react-icons/fa"
import { useAppDispatch } from "../../../hooks"
import { BoardAction } from "../../../state/slices/boardSlice"
const gf = new GiphyFetch('C8MOnqzxJ9mcZ0jUBAmY9TNSRNv5dv8e')

const DefaultElements=()=>{
    const getRandom=Math.floor(Math.random() * (100 - 20) + 20)
    return <div className="overflow-y-scroll overflow-x-hidden">

        <Section title="Shapes" elements={[]}/>
        <Section title="Icons" seeAll="icons" elements={[]}/>
        <Section title="3D Emojis" seeAll="3demojis" giphy={(offset: number) => gf.emoji({offset:getRandom,limit: 10 })} elements={[]}/>
        <Section title="Gifs" seeAll="gifs" giphy={(offset: number) => gf.trending({offset:getRandom,limit: 10 })}  elements={[]}/>
        <Section title="Texts" seeAll="texts" giphy={(offset: number) => gf.animate("insert your text",{limit: 10 })} elements={[]}/>
        <Section title="Stickers" seeAll="Stickers" elements={[]}/>

    </div>
}
export default DefaultElements


type SectionProps={
    title:string,
    seeAll?:string
    giphy?:any
    elements:Array<any>
}
const Section=({title,seeAll,elements,giphy}:SectionProps)=>{
    const dispatch=useAppDispatch()
    return <div className="flex flex-col gap-2 pb-2  text-sm">
        <div className="flex flex-row justify-between items-center">
      <span className="text-white font-semibold ">{title}</span>
       {seeAll&&  <Link to={seeAll} className="text-white opacity-40 text-[12px] transition-all font-extralight hover:opacity-100">See all</Link>}
        </div>
        <div className="relative cursor-pointer">
          {giphy&& ( <Carousel  onGifClick={(e)=>{
            console.log(e);   
           dispatch(BoardAction.AddNode({type:"image",props:{src:(e.images.fixed_width_still||e.images.fixed_width).url}}))
          }} backgroundColor="#1e2021" noLink hideAttribution className='overflow-y-scroll' gifHeight={90} fetchGifs={giphy} />)}
          <div className="bg-gradient-to-r  from-black/0 to-[#1c1e1f] top-0 right-0 absolute h-full flex justify-center items-center">
           <MoreIcon className="font-bold text-white/90 translation-all hover:scale-110"/>
          </div>
        </div>
    </div>
}