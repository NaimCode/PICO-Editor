import { Input } from "@geist-ui/core";
import { FunctionComponent, RefObject } from "react";
import {BsDownload as ExportIcon,BsPencil as EditIcon, BsCheck2Circle as CheckIcon, BsArrow90DegLeft as UndoIcon, BsArrow90DegRight as RedoIcon,BsZoomIn as ZoomInIcon,BsZoomOut as ZoomOutIcon} from "react-icons/bs"
import Button from "../Components/button";
import IconButton from "../Components/iconButton";
import Logo from "../Components/LogoBrand";
import { useAppSelector } from "../hooks";

function downloadURI(uri:any, name:string) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
type NavBarProps={
    stageRef:RefObject<any>
}
const NavBar = ({stageRef}:NavBarProps) => {
  

  const handleExport = () => {
  if(stageRef.current){
    const uri = stageRef.current.toDataURL({pixelRatio:1});
    console.log(uri);
   downloadURI(uri, 'stage.png');
  }
  };
  return (
    <div className="min-h-[70px] bg-[#0e0e15] w-full flex flex-row justify-between">
      <div className="flex flex-row items-center">
        <Logo />
        <ProjectName />
      </div>
      <div className="flex-grow flex flex-row gap-1 px-4 items-center">
        <IconButton icon={ <UndoIcon/>}/>
        <IconButton icon={ <RedoIcon/>}/>
        <div className="flex-grow"></div>
        <IconButton icon={ <ZoomOutIcon/>}/>
      <span className="text-white/90 text-sm">  100%</span>
        <IconButton icon={ <ZoomInIcon/>}/>
        <div className="w-[20px]"></div>
        <button onClick={handleExport} className="flex flex-row gap-2 items-center hover:bg-gray-300 bg-[#e7e7e8]  f py-2 px-4 rounded-md ">
            <ExportIcon className="text-xl text-black "/>
            <span className="text-black/80 text-[14px]">Export</span></button>
      </div>
    </div>
  );
};
export default NavBar;


const ProjectName:FunctionComponent = ({}) => {
    return (
     <div className="flex flex-row gap-1 w-[350px] items-center px-4 group">
         <input className="bg-transparent placeholder:text-white/30 text-white/80  flex-grow" placeholder='Your new project'/>
        <EditIcon className="text-white/80 hidden group-hover:block"/>
        <CheckIcon className="text-white/80 block group-hover:hidden"/>
     </div>
    )
  }
  
