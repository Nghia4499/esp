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

const DashBoardESP = () => {
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

  let myChart;
  let a;
  let chartTem;
  let chartHumAir;
  let chartSoilMoi;

  useEffect(() => {
    myChart = new Chart(document.getElementById("combined-chart-node1"), {
      type: "line",
      backgroundColor: "#fff",
      data: {
        labels: [0],
        datasets: [
          {
            label: "Nhiệt độ không khí",
            data: [0],
            lineTension: 0.5,
            backgroundColor: "none",
            borderColor: "red",
            yAxisID: "y",
            pointBorderWidth: 10,
            borderWidth: 5,
          },
          {
            label: "Độ ẩm không khí",
            data: [0],
            lineTension: 0.5,
            backgroundColor: "none",
            borderColor: "blue",
            yAxisID: "y1",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 10,
            borderWidth: 5,
          },
          {
            label: "Độ ẩm đất",
            data: [0],
            lineTension: 0.5,
            backgroundColor: "none",
            borderColor: "green",
            yAxisID: "y1",
            pointBorderWidth: 10,
            borderWidth: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: "#fff",

        scales: {
          x: {
            border: {
              color: "#fff",
            },
            grid: {
              color: "#fff",
              borderColor: "grey",
              tickColor: "grey",
            },
            ticks: {
              color: "#fff",
              font: {
                size: 19,
              },
            },
            title: {
              color: "#fff",
              display: true,
              text: "Thời gian",
              font: {
                size: 19,
              },
            },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            min: 20,
            max: 50,
            border: {
              color: "#fff",
            },
            grid: {
              color: "#fff",
              borderColor: "grey",
              tickColor: "grey",
            },
            stacked: true,
            ticks: {
              color: "#fff",
              font: {
                size: 19,
              },
            },
            title: {
              color: "#fff",
              display: true,
              text: "Nhiệt độ",
              font: {
                size: 19,
              },
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            min: 35,
            max: 100,
            border: {
              color: "#fff",
            },
            grid: {
              color: "blue",
              borderColor: "grey",
              tickColor: "grey",
            },
            grid: {
              tickColor: "red",
            },
            ticks: {
              color: "#fff",
              font: {
                size: 19,
              },
            },
            title: {
              color: "#fff",
              display: true,
              text: "Độ ẩm",
              font: {
                size: 19,
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Nhiệt độ, độ ẩm không khí và độ ẩm đất",
            color: "#fff",
            font: { size: "25rem" },
          },
          legend: {
            labels: {
              font: {
                size: 16,
              },
              color: "#fff",
            },
          },
        },
      },
    });
    
    a = new Chart(document.getElementById("combined-chart-node2"), {
      type: "polarArea",
      data: {
        labels: ["CO2", "CO", "CH4", "NH3"],
        datasets: [
          {
            label: "Nồng độ (ppm)",
            data: [],
            // borderColor: "red",

            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(201, 203, 207)",
            ],
            pointBackgroundColor: "red",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 21,
              },
              color: "#fff",
            },
            grid: {
              color: "#fff",
            },
            ticks: {
              color: "#fff",
              backdropColor: "#055160",
              font: {
                size: 21,
              },
            },
            max: 45,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Chất lượng không khí",
            color: "#fff",
            font: { size: "25rem" },
          },
          legend: {
            labels: {
              font: {
                size: 16,
              },
              color: "#fff",
            },
          },
        },
      },
    });

    chartTem = new Chart(document.getElementById("chartTem"), {
      type: "doughnut",
      data: {
        // labels: ["Red", "Blue"],
        datasets: [
          {
            label: "Nhiệt độ",
            data: [32, 68],
            backgroundColor: ["rgb(255, 99, 132)", "#055160"],
            hoverOffset: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        legend: false,
        circumference: 180,
        rotation: 270,
        cutout: "70%",
      },
    });

    chartHumAir = new Chart(document.getElementById("chartHumAir"), {
      type: "doughnut",
      data: {
        // labels: ["Red", "Blue"],
        datasets: [
          {
            label: "Độ ẩm không khí",
            data: [82, 18],
            backgroundColor: ["rgba(59, 182, 239, 0.8)", "#055160"],
            hoverOffset: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        legend: false,
        circumference: 180,
        rotation: 270,
        cutout: "70%",
      },
    });

    chartSoilMoi = new Chart(document.getElementById("chartSoilMoi"), {
      type: "doughnut",
      data: {
        // labels: ["Red", "Blue"],
        datasets: [
          {
            label: "Độ ẩm đất",
            data: [73, 27],
            backgroundColor: ["blue", "#055160"],
            hoverOffset: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        legend: false,
        circumference: 180,
        rotation: 270,
        cutout: "70%",
      },
    });
  }, []);

  useEffect(() => {
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

          myChart?.data?.labels?.push(now);
          myChart?.data?.datasets[0]?.data?.push(c?.temAir);

          // a?.data?.labels?.push(now);

          // a?.data?.datasets[0]?.data?.push(c?.temAir.value);
          // a?.data?.datasets[0]?.data?.push(100 - c?.temAir.value);

          myChart?.data?.datasets[1]?.data?.push(c?.humAir);
          myChart?.data?.datasets[2]?.data?.push(47);
          myChart?.update(myChart?.data);

          a?.data?.datasets[0]?.data?.push(c?.CO2);
          a?.data?.datasets[0]?.data?.push(c?.CO);
          a?.data?.datasets[0]?.data?.push(c?.CH4);
          a?.data?.datasets[0]?.data?.push(c?.NH3);

          a?.update(a?.data);
          // a?.update(a?.data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
  }

  setInterval(() => {
    let now = new Date();
    now = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    get(child(dbRef, `data`))
      .then((snapshot) => {
        // a?.data?.datasets[0]?.data?.shift();
        // a?.data?.datasets[0]?.data?.shift();
        let b = snapshot.val().value;
        b = b.split(";");
        let c = {};
        b.forEach(function (b) {
          var tup = b.split(":");
          c[tup[0]] = tup[1];
        });
        setValue(c);

        if (snapshot.exists()) {
          if (myChart?.data?.labels?.length > 5) {
            myChart?.data?.labels?.shift();
            myChart?.data?.datasets[0]?.data?.shift();
            myChart?.data?.datasets[1]?.data?.shift();
            myChart?.data?.datasets[2]?.data?.shift();
          }
          a?.data?.datasets[0]?.data?.shift();
          a?.data?.datasets[0]?.data?.shift();
          a?.data?.datasets[0]?.data?.shift();
          a?.data?.datasets[0]?.data?.shift();

          myChart?.data?.labels?.push(now);
          myChart?.data?.datasets[0]?.data?.push(
            +c?.temAir + getRandomFloat(0, 1, 2)
          );
          myChart?.data?.datasets[1]?.data?.push(
            +c?.humAir + +getRandomFloat(0, 1, 2)
          );
          myChart?.data?.datasets[2]?.data?.push(getRandomFloat(40, 95, 1));
          // a?.data?.datasets[0]?.data?.push(snapshot.val().temAir.value);
          // a?.data?.datasets[0]?.data?.push(100 - snapshot.val().temAir.value);
          myChart?.update(myChart?.data);

          // a?.data?.labels?.push(now);
          a?.data?.datasets[0]?.data?.push(+c?.CO2 + getRandomFloat(0, 5, 2));
          a?.data?.datasets[0]?.data?.push(+c?.CO + getRandomFloat(0, 5, 2));
          a?.data?.datasets[0]?.data?.push(+c?.CH4 + getRandomFloat(0, 5, 2));
          a?.data?.datasets[0]?.data?.push(+c?.NH3 + getRandomFloat(0, 5, 2));

          a?.update(a?.data);
          // a?.update(a?.data);
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, 5000);

  console.log(value?.temAir);

  return (
    <div className="container mt-5">
      <div className="d-lg-flex gap-3">
        <div className=" col-12 mb-3 col-lg-6 a rounded-3 chart">
          <canvas
            className="chart-container m-3"
            id="combined-chart-node1"
            height="75rem"
          ></canvas>
        </div>
        <div className=" col-12 mb-3 col-lg-6 a rounded-3 chart">
          <canvas
            className="chart-container m-3 "
            id="combined-chart-node2"
          ></canvas>
        </div>
      </div>
      {/* <div className="d-block d-lg-flex  mt-3"> */}
      <div className="  d-lg-flex justify-content-around mb-3">
        <div className="card  card-chart a rounded-3">
          <div className="card-body">
            <h5 className="card-title fs-4">
              <img src={temIcon} className="hum-icon me-2 mb-1" alt="" />
              Nhiệt độ không khí
            </h5>
            <canvas className="chart-infor" id="chartTem"></canvas>

            <h3 className="value">{value?.temAir}°C</h3>
            <p className="card-text text-center fs-4">
              <p>Nhiệt độ thích hợp:</p>
              <p>27°C đến 35°C</p>
            </p>
          </div>
        </div>
        <div className=" card card-chart a rounded-3">
          
          <div className="card-body">
            <h5 className="card-title fs-4">
              <img src={humIcon} className="hum-icon me-2 mb-1" alt="" />
              Độ ẩm không khí
            </h5>
            <canvas className="chart-infor" id="chartHumAir"></canvas>

            <h3 className="value">{value?.humAir}%</h3>
            <p className="card-text text-center fs-4">
              <p>Độ ẩm thích hợp:</p>
              <p>63% đến 88%</p>
            </p>
          </div>
        </div>
        <div className=" card card-chart a rounded-3">
          <div className="card-body">
            <h5 className="card-title fs-4">
              <img src={humIcon} className="hum-icon me-2 mb-1" alt="" />
              Độ ẩm đất
            </h5>
            <canvas className="chart-infor" id="chartSoilMoi"></canvas>

            <h3 className="value">{value?.moistureSoil}%</h3>
            <p className="card-text text-center fs-4">
              <p>Độ ẩm thích hợp:</p>
              <p>63% đến 88%</p>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="col-6 d-flex gap-3 mb-3">
          <div className="col card a rounded-3">
            <div className="card-body">
              <h5 className="card-title">
                <img src={temIcon} className="hum-icon me-2 mb-1" alt="" />
                Nhiệt độ đất
              </h5>
              <p className="card-text text-center fs-1 fw-bold main-text">
                31°C
              </p>
              <p className="card-text text-center fs-4">
                Nhiệt độ thích hợp: 30°C
              </p>
              <div className="device">
                <h5 className="text-center py-2">Bơm phun nước</h5>
                <div className="d-flex justify-content-center align-items-center pb-3">
                  <div
                    className="toggle toggle-pump-soil"
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col card a rounded-3">
            <div className="card-body">
              <h5 className="card-title">
                <img src={humIcon} className="hum-icon me-2 mb-1" alt="" />
                Độ ẩm đất
              </h5>
              <p className="card-text text-center fs-1 fw-bold main-text">
                {data?.soilMoi?.value}%
              </p>
              <p className="card-text text-center fs-4">Độ ẩm thích hợp: 30%</p>
              <div className="device">
                <h5 className="text-center py-2">Bơm phun nước</h5>
                <div className="d-flex justify-content-center align-items-center pb-3">
                  <div
                    className="toggle toggle-pump3"
                    onClick={() =>
                      handleClickToggle(".toggle-pump3", ".motor3")
                    }
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
                      className="motor motor3"
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
        </div> */}
      {/* </div> */}
      <div className="col d-flex gap-3 pb-3">
        <div className="col-6 card a rounded-3">
          <div className="card-body">
            <h5 className="card-title">
              <i className="me-2 fa-solid fa-sun" />
              Cường độ sáng
            </h5>
            <p className="card-text text-center fs-1 fw-bold main-text">
              31.50%
            </p>
            <p className="card-text text-center fs-4">
              Cường độ sáng thích hợp: 30%
            </p>
            <div className="device">
              <h5 className="text-center py-2">Đèn chiếu sáng</h5>
              <div className="d-flex justify-content-center align-items-center pb-3">
                <div
                  className="toggle toggle-light"
                  onClick={() => handleTurnOnLight()}
                  id="switch"
                >
                  <div className="toggle-text-off">OFF</div>
                  <div className="glow-comp" />
                  <div className="toggle-button" />
                  <div className="toggle-text-on">ON</div>
                </div>
                <i className="me-2 fa-solid fa-lightbulb light ms-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 card a rounded-3">
          <div className="card-body">
            <h5 className="card-title">
              <i className="me-2 fa-solid fa-water" />
              Mực nước trong bồn
            </h5>
            <p className="card-text text-center fs-1 fw-bold main-text">
              31.50cm
            </p>
            <p className="card-text text-center fs-4">Mực nước tối đa: 100cm</p>
            <div className="device">
              <h5 className="text-center py-2">Bơm nước</h5>
              <div className="d-flex justify-content-center align-items-center pb-3">
                <div
                  className="toggle toggle-pump4"
                  onClick={() => handleClickToggle(".toggle-pump4", ".motor4")}
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
                    className="motor motor4"
                    id="img"
                    src={pum2}
                    alt
                    srcSet
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

export default DashBoardESP;
