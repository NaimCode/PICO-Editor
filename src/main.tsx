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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to={"texts"} />} />
              <Route path="shapes" element={<Shapes />} />
              <Route path="texts" element={<Texts />} />
              <Route path="*" element={<SideContent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
