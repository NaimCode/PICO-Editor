import { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
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
        <div className="flex-grow w-full flex flex-row">
          <SideBar />
          <SideContent />
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
