import {
  getDatabase,
  ref,
  child,
  get,
  update,
  set,
  onValue,
} from "firebase/database";
import database from "../../../connectFirebase";
// import "./logic.js"
import "./style.scss";
import fan from "./fan.jpeg";
import pum1 from "./pump/pum1-Photoroom.png";
import pum2 from "./pump/pum2_transparent.png";
import humIcon from "./humidity.png";
import temIcon from "./temperature.png";
import airIcon from "./clean-air.png";
import controlIcon from "./temperature-control.png";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { NavLink, Link } from "react-router-dom";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const Esp = () => {

  return (
    <div className="web-server">
      <Header />
      
      <Outlet />
      {/* <canvas
        className="chart-container m-3"
        id="chart-test"
        height="75rem"
        width='10rem'
      ></canvas> */}
      
    </div>
  );
};

export default Esp;
