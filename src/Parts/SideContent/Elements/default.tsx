import { GiphyFetch } from "@giphy/js-fetch-api"
import { Carousel, Grid, SearchBar } from "@giphy/react-components"
import { Link } from "react-router-dom"
import {FaChevronRight as MoreIcon} from "react-icons/fa"
import { useAppDispatch } from "../../../hooks"
import { BoardAction } from "../../../state/slices/boardSlice"
import { ReactNode } from "react"
import { Layer, Stage } from "react-konva"
import { ListShapes } from "../Shapes"
const gf = new GiphyFetch('C8MOnqzxJ9mcZ0jUBAmY9TNSRNv5dv8e')

const DefaultElements=()=>{
    const getRandom=Math.floor(Math.random() * (100 - 20) + 20)
    const dispatch=useAppDispatch()
    return <div className="overflow-y-scroll overflow-x-hidden">

        <Section title="Shapes">
        <div className="flex flex-row items-center overflow-x-scroll" >
        {ListShapes.map((shape, i) => {
          return (
            <Stage
            key={i}
            // scaleX={.8}
            // scaleY={.8}
            onClick={(e)=>{
              dispatch(BoardAction.AddNode({type:shape.type,props:shape.props}))
            }}
              width={100}
              height={80}
              className="hover:scale-105 transition-all "
            >
              <Layer >{shape.render(shape.props)}</Layer>
            </Stage>
          );
        })}
      </div>
        </Section>
        {/* <Section title="Icons" seeAll="icons" elements={[]}/> */}
        <Section title="3D Emojis" seeAll="3demojis" giphy={(offset: number) => gf.emoji({offset:getRandom,limit: 10 })} elements={[]}/>
        <Section title="Gifs" seeAll="gifs" giphy={(offset: number) => gf.trending({offset:getRandom,limit: 10 })}  elements={[]}/>
        {/* <Section title="Texts" seeAll="texts" giphy={(offset: number) => gf.animate("insert your text",{limit: 10 })} elements={[]}/> */}
        <Section title="Socials Medias" elements={['facebook','snapchat','instagram','twitter','dropbox','linkedin','whatsapp','youtube',"spotify"].map((r)=>"/socialMedia/"+r+".png")}/>
        

    </div>
}
export default DefaultElements


type SectionProps={
    title:string,
    seeAll?:string
    giphy?:any
    elements?:Array<any>,
    children?:ReactNode
}
const Section=({title,seeAll,elements,giphy, children}:SectionProps)=>{
    const dispatch=useAppDispatch()
    return <div className="flex flex-col gap-5   text-sm">
        <div className="flex flex-row justify-between items-center">
      <span className="text-white font-semibold ">{title}</span>
       {seeAll&&  <Link to={seeAll} className="text-white opacity-40 text-[12px] transition-all font-extralight hover:opacity-100">See all</Link>}
        </div>
        <div className="relative cursor-pointer">
          {giphy&& ( <Carousel  onGifClick={(e)=>{
            console.log(e);   
           dispatch(BoardAction.AddNode({type:"image",props:{src:(e.images.fixed_width_still||e.images.fixed_width).url}}))
          }} backgroundColor="#1e2021" noLink hideAttribution className='overflow-y-scroll' gifHeight={90} fetchGifs={giphy} />)}
          {
           elements && ( <div className="flex flex-row gap-3 overflow-x-scroll">
            {elements.map((e,i)=>(<img key={i} src={e} className="w-auto h-[50px] translation-all hover:scale-105" onClick={()=>dispatch(BoardAction.AddNode({type:"image",props:{src:e,width:60,height:60}}))} />))}
            </div>)

          }
          {children}
          <div className="bg-gradient-to-r  from-black/0 to-[#1c1e1f] top-0 right-0 absolute h-full flex justify-center items-center">
           <MoreIcon className="font-bold text-white/90 translation-all hover:scale-110"/>
          </div>
        </div>
    </div>
}