import { Input } from "@geist-ui/core";
import { FunctionComponent, RefObject } from "react";
import {
  BsShare as ShareIcon,
  BsSave2 as SaveIcon,
  BsFilePlus as NewIcon,
  BsDownload as ExportIcon,
  BsPencil as EditIcon,
  BsCheck2Circle as CheckIcon,
  BsZoomIn as ZoomInIcon,
  BsZoomOut as ZoomOutIcon,
} from "react-icons/bs";
import Button from "../Components/button";
import IconButton from "../Components/iconButton";
import Logo from "../Components/LogoBrand";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  AppConfigAction,
  SelectAppConfigScaling,
} from "../state/slices/appConfigSlice";
import { BoardAction, SelectBoardTitle } from "../state/slices/boardSlice";
import { DataAction } from "../state/slices/dataSlice";

function downloadURI(uri: any, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

type NavBarProps = {
  stageRef: RefObject<any>;
};
const NavBar = ({ stageRef }: NavBarProps) => {
  const dispatch = useAppDispatch();
  const scale = useAppSelector(SelectAppConfigScaling);
  const title = useAppSelector(SelectBoardTitle);
  const handleExport = () => {
    const ext = ".png";
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL({ pixelRatio: 1 });
      downloadURI(uri, (title || "PICO_Editor_project") + ext);
    }
  };
  //   const handleNewProject = () => {
  //     dispatch(BoardAction.NewProject());
  //   };
  // handleNewProject()
  //dispatch(BoardAction.Init())
  //dispatch(DataAction.Fix())
  return (
    <div className="min-h-[70px] max-h-[70px] bg-[#0e0e15] w-full flex flex-row justify-between">
      <div className="flex flex-row items-center">
        <Logo />
        <ProjectName title={title!} dispatch={dispatch} />
      </div>
      <div className="flex-grow flex flex-row gap-3 px-2 items-center">
        {/* <IconButton
          props={{ 
        onClick: ()=>dispatch(BoardAction.Init())
          }}
          icon={<NewIcon />}
        /> */}
        <div className="flex-grow"></div>
        <button
          onClick={() => dispatch(BoardAction.Init())}
          className="font-light  flex flex-row gap-2 items-center transition-all text-white/60 hover:text-white"
        >
          <NewIcon />
          <span>New project</span>
        </button>
        <div className="w-[1px] h-[15px] bg-gray-300/40 mx-1"></div>
        {/* <IconButton icon={<SaveIcon />} /> */}
        <button className="font-light  flex flex-row gap-2 items-center transition-all text-white/60 hover:text-white">
          <SaveIcon />
          <span>Save</span>
        </button>
        <div className="w-[1px] h-[15px] bg-gray-300/40 mx-1"></div>
        {/* <IconButton icon={<ShareIcon />} /> */}
        <button className="font-light  flex flex-row gap-2 items-center transition-all text-white/60 hover:text-white">
          <ShareIcon />
          <span>Share</span>
        </button>
        {/* <button  className="transition-all flex flex-row gap-2 opacity-80 items-center hover:opacity-100 border-[rgb(231,231,232)] text-[rgb(231,231,232)] border-[1px]  f py-2 px-2 rounded-md ">
          
            <span className=" text-[13px]">New project</span></button>
       <button onClick={handleNewProject} className="transition-all flex flex-row gap-2 opacity-80 items-center hover:opacity-100 border-[rgb(231,231,232)] text-[rgb(231,231,232)] border-[1px]  f py-2 px-2 rounded-md ">
          
          <span className=" text-[13px]">New project</span></button> */}
        {/* <IconButton icon={ <UndoIcon/>}/>
        <IconButton icon={ <RedoIcon/>}/> */}

        <button
          onClick={handleExport}
          className="flex flex-row gap-2 items-center hover:bg-gray-300 bg-[#e7e7e8]  ml-5 py-2 px-4 rounded-md "
        >
          <ExportIcon className="text-xl text-black " />
          <span className="text-black/80 text-[14px]">Export</span>
        </button>
      </div>
    </div>
  );
};
export default NavBar;

const ProjectName = ({ title, dispatch }: { title: string; dispatch: any }) => {
  return (
    <div
      style={{ fontFamily: "" }}
      className="flex flex-row gap-1 w-[350px] items-center px-5 group"
    >
      <input
        value={title}
        onChange={(e) => {
          dispatch(BoardAction.ChangeName(e.target.value));
        }}
        className="bg-transparent placeholder:text-white/30 text-white/80  flex-grow"
        placeholder="Your new project"
      />
      <EditIcon className="text-white/80 hidden group-hover:block" />
      <CheckIcon className="text-white/80 block group-hover:hidden" />
    </div>
  );
};
