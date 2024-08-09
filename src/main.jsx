import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import App from "./App.jsx";
import "./index.css";
import Esp from "./components/Esp/Esp.jsx";
import DashBoardESP from "./components/Esp/DashBoard/DashBoardESP.jsx";
import Control from "./components/Esp/Control/Control.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>

        <Route path="/esp32" element={<Esp />}>
          <Route index element={<DashBoardESP />} />
          <Route path="/esp32/control" element={<Control />} />
          {/* <Route path="/esp32/weather" element={<Weather />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
 
);
