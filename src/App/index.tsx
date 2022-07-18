import { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import Board from "../Parts/Board";
import SideBar from "../Parts/SideBar";
import SideContent from "../Parts/SideContent";
import NavBar from "./navBar";

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <main className="h-screen flex flex-col">
        {/* NavBar */}
        <NavBar />
        {/* Content */}
        <div className="flex-grow w-full flex flex-row overflow-hidden">
          <SideBar />
          <SideContent />
          <Board/>
        </div>
        
      </main>
    </BrowserRouter>
  );
};

export default App;
