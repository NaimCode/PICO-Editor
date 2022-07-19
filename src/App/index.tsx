import { FunctionComponent, useRef } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import Board from "../Parts/Board";
import SideBar from "../Parts/SideBar";
import SideContent from "../Parts/SideContent";
import NavBar from "./navBar";

const App: FunctionComponent = () => {
  const stageRef=useRef()
  return (
      <main className="h-screen flex flex-col">
        {/* NavBar */}
        <NavBar stageRef={stageRef}/>
        {/* Content */}
        <div className="flex-grow w-full flex flex-row overflow-hidden">
          <SideBar />
          <Outlet/>
          <Board stageRef={stageRef}/>
        </div>
        
      </main>
  );
};

export default App;
