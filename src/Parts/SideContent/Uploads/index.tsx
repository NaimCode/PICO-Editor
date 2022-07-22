import { useEffect } from "react"
import useImage from "use-image"
import SideContent from ".."

const Uploads = () => {
   const [img,state]= useImage("/1.jpg")
   useEffect(() => {
    console.log(img?.src,state)
   }, [img,state])
  return (
    <SideContent>
   {/* <div className="flex flex-wrap gap-2 overflow-hidden">

      
           {['/1.jpg','/2.jpg','/3.jpg','/4.jpg','/5.jpg','/6.jpg','/7.jpg','/8.jpg'].map((n,i)=>{
           return <img key={i} src={n} loading="lazy" className="w-[45%] h-auto"/>
           })}
        </div>
   */}
    </SideContent>
  )
}

export default Uploads