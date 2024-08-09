import "./style.scss";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  set,
  onValue,
} from "firebase/database";
import database from "../../../../connectFirebase";
import "./style.scss";
import fan from "../fan.jpeg";
import pum1 from "../pump/pum1-Photoroom.png";
import pum2 from "../pump/pum2_transparent.png";
import humIcon from "../humidity.png";
import temIcon from "../temperature.png";
import airIcon from "../clean-air.png";
import controlIcon from "../temperature-control.png";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { NavLink, Link } from "react-router-dom";

const Control = () => {
  const dbRef = ref(database);
  const db = getDatabase();
  const [data, setData] = useState();
  const [isAuto, setIsAuto] = useState();
  const [temAir, setTemAir] = useState({});
  const [humAir, setHumAir] = useState({});
  const [soilMoi, setSoilMoi] = useState({});
  const [qualityAir, setQualityAir] = useState();
  const [isFan, setIsFan] = useState();
  const [isPumpAir, setIsPumpAir] = useState();
  const [isPumpSoil, setIsPumpSoil] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    get(child(dbRef, `data`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let b = snapshot.val().value;
          b = b.split(";");
          let c = {};
          b.forEach(function (b) {
            var tup = b.split(":");
            c[tup[0]] = tup[1];
          });
          setValue(c);

          setData(snapshot.val());
          setIsAuto(snapshot.val()?.auto);
          setHumAir({
            min: snapshot.val().humAir.min,
            max: snapshot.val().humAir.max,
          });
          setTemAir({
            min: snapshot.val().temAir.min,
            max: snapshot.val().temAir.max,
          });
          setSoilMoi({
            min: snapshot.val().soilMoi.min,
            max: snapshot.val().soilMoi.max,
          });
          setQualityAir({
            min: snapshot.val().qualityAir.min,
            max: snapshot.val().qualityAir.max,
          });
          setIsFan(snapshot.val().fan);
          setIsPumpAir(snapshot.val().pumpAir);
          setIsPumpSoil(snapshot.val().pumpSoil);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  setInterval(() => {
    let now = new Date();
    now = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    get(child(dbRef, `data`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let b = snapshot.val().value;
          b = b.split(";");
          let c = {};
          b.forEach(function (b) {
            var tup = b.split(":");
            c[tup[0]] = tup[1];
          });
          setValue(c);

          setData(snapshot.val());
          setIsFan(snapshot.val().fan);
          setIsPumpAir(snapshot.val().pumpAir);
          setIsPumpSoil(snapshot.val().pumpSoil);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, 5000);

  //Handle submit data
  const handleSubmit = () => {
    if (isAuto === "off") {
      update(ref(db), { "data/temAir": { ...data, ...temAir } });
      update(ref(db), { "data/humAir": { ...data, ...humAir } });
      update(ref(db), { "data/soilMoi": { ...data, ...soilMoi } });
      update(ref(db), { "data/qualityAir": { ...data, ...qualityAir } });
    }
  };

  //Button toggle
  const handleClickToggle = (nameToggle, nameDevice) => {
    if (isAuto === "on") {
      let toggle = document.querySelector(nameToggle);
      let fan = document.querySelector(nameDevice);

      if (!Object.values(toggle.classList).includes("toggle-on")) {
        toggle.classList.add("toggle-on");
        fan.style.animationDuration = 0.1 + "s";
      } else {
        toggle.classList.remove("toggle-on");
        fan.style.animationDuration = 0 + "s";
      }
    }
  };

  //Button toggle fan
  const handleClickToggleFan = () => {
    if (isAuto === "off") {
      let toggle = document.querySelector(".toggle-fan");
      let fan = document.querySelector(".fan");

      if (!Object.values(toggle.classList).includes("toggle-on")) {
        toggle.classList.add("toggle-on");
        fan.style.animationDuration = 0.1 + "s";
        update(ref(db), { "data/fan": "on" });
      } else {
        toggle.classList.remove("toggle-on");
        fan.style.animationDuration = 0 + "s";
        update(ref(db), { "data/fan": "off" });
      }
    }
  };

  //Button toggle pump air
  const handleClickTogglePumpAir = () => {
    if (isAuto === "off") {
      let toggle = document.querySelector(".toggle-pump-air");
      let pumpAir = document.querySelector(".pump-air");

      if (!Object.values(toggle.classList).includes("toggle-on")) {
        toggle.classList.add("toggle-on");
        pumpAir.style.animationDuration = 0.1 + "s";
        update(ref(db), { "data/pumpAir": "on" });
      } else {
        toggle.classList.remove("toggle-on");
        pumpAir.style.animationDuration = 0 + "s";
        update(ref(db), { "data/pumpAir": "off" });
      }
    }
  };

  //Button toggle pump soil
  const handleClickTogglePumpSoil = () => {
    if (isAuto === "off") {
      let toggle = document.querySelector(".toggle-pump-soil");
      let pumpAir = document.querySelector(".pump-soil");

      if (!Object.values(toggle.classList).includes("toggle-on")) {
        toggle.classList.add("toggle-on");
        pumpAir.style.animationDuration = 0.1 + "s";
        update(ref(db), { "data/pumpSoil": "on" });
      } else {
        toggle.classList.remove("toggle-on");
        pumpAir.style.animationDuration = 0 + "s";
        update(ref(db), { "data/pumpSoil": "off" });
      }
    }
  };

  //Button toggle light
  const handleTurnOnLight = () => {
    let toggle = document.querySelector(".toggle-light");
    let light = document.querySelector(".light");

    if (!Object.values(toggle.classList).includes("toggle-on")) {
      toggle.classList.add("toggle-on");
      light.classList.add("light-on");
    } else {
      toggle.classList.remove("toggle-on");
      light.classList.remove("light-on");
    }
  };

  //Button auto
  const handleClickAuto = () => {
    let toggle = document.querySelector(".toggle-auto");

    if (!Object.values(toggle.classList).includes("toggle-on")) {
      toggle.classList.add("toggle-on");
      setIsAuto("on");
      update(ref(db), { "data/auto": "on" });
    } else {
      toggle.classList.remove("toggle-on");
      setIsAuto("off");
      update(ref(db), { "data/auto": "off" });
    }
  };

  return (
    <div className="container esp-control">
      <div className="col d-flex gap-4">
        <div className="setting col col-lg-6 d-flex a rounded-3">
          <div className="m-4 p-auto ">
            <h4 className="fs-5 text-center fw-bold mb-4">
              <img src={controlIcon} className="hum-icon me-2 mb-1" alt="" />
              Cài đặt thông số hệ thống:
            </h4>

            <div className="d-flex align-items-center mb-4">
              <span className="fs-6 fw-bold fs-lg-5 me-3">Chế độ Auto:</span>
              <div
                className={
                  isAuto === "on"
                    ? "toggle toggle-auto toggle-on"
                    : "toggle toggle-auto"
                }
                onClick={() => handleClickAuto()}
                id="switch"
              >
                <div className="toggle-text-off">OFF</div>
                <div className="glow-comp" />
                <div className="toggle-button" />
                <div className="toggle-text-on">ON</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-6 mb-2 mb-lg-4">
                <span className="mb-2 fs-6 fs-lg-5">
                  <img src={temIcon} className="hum-icon me-2 mb-1" alt="" />
                  Nhiệt độ không khí (°C):
                </span>
                <div className="d-flex">
                  <div className="form-floating me-3 ">
                    <input
                      className="form-control"
                      id="floatingInput"
                      type="number"
                      value={temAir.min}
                      onChange={(e) =>
                        setTemAir({ ...temAir, min: e.target.min })
                      }
                    />
                    <label htmlFor="floatingInput">Min</label>
                  </div>
                  <div className="form-floating">
                    <input
                      className="form-control"
                      id="floatingInput"
                      value={humAir.max}
                      onChange={(e) =>
                        setTemAir({ ...temAir, max: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInput">Max</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-2">
                <span className="mb-3 fs-6 fs-lg-5">
                  <img src={humIcon} className="hum-icon me-2 mb-1" alt="" />
                  Độ ẩm không khí (%):
                </span>
                <div className="d-flex">
                  <div className="form-floating me-3 ">
                    <input
                      className="form-control"
                      id="floatingInput"
                      value={humAir.min}
                      onChange={(e) =>
                        setHumAir({ ...humAir, min: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInput">Min</label>
                  </div>
                  <div className="form-floating">
                    <input
                      className="form-control"
                      id="floatingInput"
                      value={humAir.max}
                      onChange={(e) =>
                        setHumAir({ ...humAir, max: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInput">Max</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-2">
                <span className="mb-2 fs-6 fs-lg-5">
                  <img src={humIcon} className="hum-icon me-2 mb-1" alt="" />
                  Độ ẩm đất (%):
                </span>
                <div className="d-flex">
                  <div className="form-floating me-3 ">
                    <input
                      className="form-control"
                      id="floatingInput"
                      value={soilMoi.min}
                      onChange={(e) =>
                        setSoilMoi({ ...soilMoi, min: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInput">Min</label>
                  </div>
                  <div className="form-floating">
                    <input
                      className="form-control"
                      id="floatingInput"
                      value={soilMoi.min}
                      onChange={(e) =>
                        setSoilMoi({ ...soilMoi, max: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInput">Max</label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-2">
                <span className="mb-2 fs-6 fs-lg-5">
                  <img src={airIcon} className="hum-icon me-2 mb-1" alt="" />
                  Chất lượng không khí (%):
                </span>
                <div className="d-flex">
                  <div className="form-floating me-3 ">
                    <input
                      className="form-control"
                      id="floatingInput"
                      value={qualityAir?.min}
                      onChange={(e) =>
                        setQualityAir({ ...qualityAir, min: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInput">Min</label>
                  </div>
                  <div className="form-floating">
                    <input
                      className="form-control"
                      id="floatingInput"
                      disabled
                    />
                    <label htmlFor="floatingInput">Max</label>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => handleSubmit()}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card col col-lg-6 a rounded-3">
          <div className="card-body">
            <h5 className="card-title">
              <img src={temIcon} className="hum-icon me-2 mb-1" alt="" />
              Nhiệt độ không khí
            </h5>
            <p className="card-text text-center fs-1 fw-bold main-text">
              {value?.temAir}°C
            </p>
            <p className="card-text text-center fs-4">
              Nhiệt độ thích hợp: 30°C
            </p>
            <div className="device">
              <h5 className="text-center py-2">Quạt thông khí</h5>
              <div className="d-flex justify-content-center align-items-center pb-3">
                <div
                  className={
                    isFan == "on"
                      ? "toggle toggle-fan toggle-on"
                      : "toggle toggle-fan"
                  }
                  onClick={() => handleClickToggleFan()}
                  id="switch"
                >
                  <div className="toggle-text-off">OFF</div>
                  <div className="glow-comp" />
                  <div className="toggle-button" />
                  <div className="toggle-text-on">ON</div>
                </div>
                <img
                  className="fan ms-5"
                  id="img"
                  src={fan}
                  alt
                  srcSet
                  style={
                    isFan == "on"
                      ? { animationDuration: 0.1 + "s" }
                      : { animationDuration: 0 + "s" }
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col d-flex mt-4 gap-4">
        <div className="card col col-lg-6 a rounded-3">
          <div className="card-body">
            <h5 className="card-title">
              <img src={humIcon} className="hum-icon me-2 mb-1" alt="" />
              Độ ẩm không khí
            </h5>
            <p className="card-text text-center fs-1 fw-bold main-text">
              {value?.humAir}%
            </p>
            <p className="card-text text-center fs-4">Độ ẩm thích hợp: 70%</p>
            <div className="device">
              <h5 className="text-center py-2">Bơm phun nước</h5>
              <div className="d-flex justify-content-center align-items-center pb-3">
                <div
                  className={
                    isPumpAir == "on"
                      ? "toggle toggle-pump-air toggle-on"
                      : "toggle toggle-pump-air"
                  }
                  onClick={() => handleClickTogglePumpAir()}
                  id="switch"
                >
                  <div className="toggle-text-off">OFF</div>
                  <div className="glow-comp" />
                  <div className="toggle-button" />
                  <div className="toggle-text-on">ON</div>
                </div>
                <div className="img-pump">
                  <img className="ms-5 pump" id="img" src={pum1} alt srcSet />
                  <img
                    className="motor pump-air"
                    id="img"
                    src={pum2}
                    alt
                    srcSet
                    style={
                      isPumpAir == "on"
                        ? { animationDuration: 0.1 + "s" }
                        : { animationDuration: 0 + "s" }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card col col-lg-6 a rounded-3">
          <div className="card-body">
            <h5 className="card-title">
              <img src={humIcon} className="hum-icon me-2 mb-1" alt="" />
              Độ ẩm đất
            </h5>
            <p className="card-text text-center fs-1 fw-bold main-text">
              {value?.moistureSoil}%
            </p>
            <p className="card-text text-center fs-4">Độ ẩm thích hợp: 70%</p>
            <div className="device">
              <h5 className="text-center py-2">Bơm phun nước</h5>
              <div className="d-flex justify-content-center align-items-center pb-3">
                <div
                  className={
                    isPumpSoil == "on"
                      ? "toggle toggle-pump-soil toggle-on"
                      : "toggle toggle-pump-soil"
                  }
                  onClick={() => handleClickTogglePumpSoil()}
                  id="switch"
                >
                  <div className="toggle-text-off">OFF</div>
                  <div className="glow-comp" />
                  <div className="toggle-button" />
                  <div className="toggle-text-on">ON</div>
                </div>
                <div className="img-pump">
                  <img className="ms-5 pump" id="img" src={pum1} alt srcSet />
                  <img
                    className="motor pump-soil"
                    id="img"
                    src={pum2}
                    alt
                    srcSet
                    style={
                      isPumpSoil == "on"
                        ? { animationDuration: 0.1 + "s" }
                        : { animationDuration: 0 + "s" }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;
