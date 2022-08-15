import { FunctionComponent, useEffect, useRef, useState } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import Board from "../Parts/Board";
import SideBar from "../Parts/SideBar";
import SideContent from "../Parts/SideContent";
import { BoardAction } from "../state/slices/boardSlice";
import NavBar from "./navBar";
import { Helmet } from "react-helmet";
import InitProject from "../Parts/InitProject";
import { PAUSE } from "redux-persist/lib/constants";
import { useToasts } from "@geist-ui/core";

const App: FunctionComponent = () => {
  const stageRef = useRef();
  console.log(import.meta.env.VITE_APP_GIPHY_KEY,import.meta.env.VITE_APP_UNSPLASH_ACCESS);
  
  window.onbeforeunload = (event) => {
    
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };
  let favIcon = "/favicon.png";
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    favIcon = "/faviconDark.png";
    // Theme set to dark.
  }

  return (
    <main className="relative">
      <Helmet>
        <link rel="icon" type="image/png" href={favIcon} />
      </Helmet>
      <section className="h-screen flex flex-col  overflow-hidden">
        {/* NavBar */}
        <NavBar stageRef={stageRef} />
        {/* Content */}
        <div className="flex-grow w-full flex flex-row overflow-hidden relative">
          <SideBar />
          <Outlet />
          <Board stageRef={stageRef} />
        </div>
      </section>
      <ResponsiveView/>
      <InitProject/>
    </main>
  );
};

export default App;

const ResponsiveView=()=>{
  //get the current width of the window
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth||0);

useEffect(() => {
  console.log(windowSize);
  
    const handleResize = () => {
        setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
}, [])

  return (<div className={`${windowSize>=900&&"hidden"} absolute z-50 filter backdrop-blur-[10px] top-0 left-0 h-screen w-screen flex justify-center items-center`}>
  <span className="italic drop-shadow-lg px-4 text-center font-bold">Please use a bigger screen, the app doesn't support small screen yet</span>
</div>)


}