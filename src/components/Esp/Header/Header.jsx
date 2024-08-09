import "./style.scss";
import { Link } from "react-router-dom";
import controlIcon from "../control.png";
import logo from "../logo.png";
import cameraIcon from "../camera.png";
import calendarIcon from "../calendar.png";
import clockIcon from "../clock.png";

const Header = () => {
  const clock = () => {
    let date = new Date();
    let curDay = date.getDay();
    let dayArr = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    let day = dayArr[curDay];
    let curDate = date.getDate();
    let curMonth = date.getMonth() + 1;
    let curYear = date.getFullYear();
    document.getElementById("current-day")
      ? (document.getElementById("current-day").innerHTML =
          day + ", " + curDate + "/" + curMonth + "/" + curYear)
      : document.getElementById("current-day");

    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    document.getElementById("times")
      ? (document.getElementById("times").innerHTML =
          hour + ":" + min + ":" + sec)
      : document.getElementById("times");
  };

  setInterval(() => {
    clock();
  }, 1000);

  return (
    <nav className="navbar p-2 text-white bg-opacity-75 fw-bold">
      <div className="container">
        <div className="nav-item">
          <a className="navbar-brand d-flex" href="#">
            <img src={logo} className="logo me-2" alt="" />
            <div className="name-farm">
              <p className="mb-0 fs-6">SMART IOT</p>
              <h5 className="mb-0">FRAM</h5>
            </div>
          </a>
        </div>
        <Link to="/esp32/cam" className="nav-item fs-6 d-flex">
          <img src={cameraIcon} className="nav-icon me-2" alt="" />
          <div className="name-nav-item fs-6">Camera</div>
        </Link>
        <Link to="/esp32/control" className="nav-item fs-6 d-flex">
          <img src={controlIcon} className="nav-icon me-2" alt="" />
          <div className="name-nav-item fs-6">Control</div>
        </Link>
        <div className="nav-item fs-6 d-flex">
          <img src={calendarIcon} className="nav-icon me-2" alt="" />
          <div className="name-nav-item fs-6" id="current-day" />
        </div>
        <div className="nav-item fs-6 d-flex">
          <img src={clockIcon} className="nav-icon me-2" alt="" />
          <div className="name-nav-item fs-6" id="times" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
