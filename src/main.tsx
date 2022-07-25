import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store, persitor } from "./state";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import SideContent from "./Parts/SideContent";
import Shapes from "./Parts/SideContent/Shapes";
import { PersistGate } from "redux-persist/integration/react";
import Texts from "./Parts/SideContent/Texts";
import Uploads from "./Parts/SideContent/Uploads";
import Elements from "./Parts/SideContent/Elements";
import DefaultElements from "./Parts/SideContent/Elements/default";
import Emoji3D from './Parts/SideContent/Elements/3DIcons/index';
import Gifs from "./Parts/SideContent/Elements/Gifs";
import Images from "./Parts/SideContent/Images";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persitor} > */}
       
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to={"elements"} />} />
              <Route path="elements" element={<Elements />}>
                <Route index element={<DefaultElements/>}/>
                <Route path="3demojis" element={<Emoji3D/>}/>
                <Route path="gifs" element={<Gifs/>}/>
              </Route>
              <Route path="images" element={<Images />} />
              <Route path="texts" element={<Texts />} />
              <Route path="uploads" element={<Uploads />} />
              <Route path="*" element={<SideContent />} />
            </Route>
          </Routes>
        </BrowserRouter>
     
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
