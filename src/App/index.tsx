import { FunctionComponent, useRef } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import Board from "../Parts/Board";
import SideBar from "../Parts/SideBar";
import SideContent from "../Parts/SideContent";
import { BoardAction } from "../state/slices/boardSlice";
import NavBar from "./navBar";
import { Helmet } from "react-helmet";
import InitProject from "../Parts/InitProject";
const App: FunctionComponent = () => {
  const stageRef = useRef();
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };
  //get system theme mode
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
      <InitProject/>
    </main>
  );
};

export default App;

