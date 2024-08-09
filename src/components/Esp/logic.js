window.onload = setInterval(clock, 1000);

function clock() {
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
  document.getElementById("current-day").innerHTML =
    day + ", " + curDay + "/" + curMonth + "/" + curYear;

  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  document.getElementById("times").innerHTML = hour + ":" + min + ":" + sec;
}

// Chart
var Chart_node1 = new Highcharts.Chart({
  chart: {
    renderTo: "combined-chart-node1",
    backgroundColor: "#055160 ",
    borderWidth: 2,
    borderColor: "#6ea8fe",
    borderRadius: 15,
    plotBorderColor: "red",
  },
  title: {
    text: "Nhiệt độ và Độ ẩm",
    style: {
      color: "#cfe2ff",
    },
  },
  colorAxis: {
    lineColor: "red",
  },
  tooltip: {
    animation: {
      duration: 300,
    },
    // backgroundColor:"#055160 "
  },
  series: [
    {
      name: "Humidity",
      showInLegend: true,
      data: [72, 75, 78, 69, 80, 73, 79, 73],
      color: "#FFA500",
    },
    {
      name: "Temperature",
      showInLegend: true,
      data: [30.8, 31.2, 30.9, 31.5, 31.6, 31.1, 32, 31.3],
      color: "#00FF00",
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
    series: { color: "#020195" },
  },
  xAxis: {
    // type: "datetime",
    // dateTimeLabelFormats: { second: "%H:%M:%S" },
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  yAxis: [{
    gridLineColor: "white",
    labels:{
      style:{
        color: "white",
        fontSize:20,
      },
    },
    lineWidth:2,
    lineColor: "white",

  }
   
  ],
  credits: { enabled: false },
});

var Chart_node2 = new Highcharts.Chart({
  chart: { renderTo: "combined-chart-node2" },
  title: { text: "CHẤT LƯỢNG KHÔNG KHÍ VÀ ĐỘ ẨM ĐẤT" },
  series: [
    {
      name: "Humidity",
      showInLegend: true,
      data: [72, 75, 78, 69, 80, 73, 79, 73],
      color: "#FFA500",
    },
    {
      name: "Temperature",
      showInLegend: true,
      data: [30.8, 31.2, 30.9, 31.5, 31.6, 31.1, 32, 31.3],
      color: "#00FF00",
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
    series: { color: "#020195" },
  },
  xAxis: {
    // type: "datetime",
    // dateTimeLabelFormats: { second: "%H:%M:%S" },
    categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  yAxis: [
    { title: { text: "Value" } },
    { title: { text: "" }, opposite: true },
    { title: { text: "" }, opposite: true },
  ],
  credits: { enabled: false },
});
setInterval(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var x = new Date().getTime();
      var currentDate = new Date(x);
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
      var year = currentDate.getFullYear();
      document.getElementById("air_quality").innerHTML = data.airQuality;
      document.getElementById("temp").innerHTML = data.temp;
      document.getElementById("humi").innerHTML = data.humi;
      document.getElementById("dust_humi").innerHTML = data.dustHumidity;
      document.getElementById("datetime").innerHTML =
        day + "/" + month + "/" + year;
    }
  };
  xhttp.open("GET", "readADC", true);
  xhttp.send();
}, 3000);

setInterval(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var currentTime = new Date().getTime();
      var vietnamTimeOffset = 7 * 60 * 60 * 1000;
      var x = currentTime + vietnamTimeOffset;
      Humidity1 = parseFloat(data.humi);
      Temperature1 = parseFloat(data.temp);
      AirQuality = parseFloat(data.airQuality);
      DustHumidity = parseFloat(data.dustHumidity);
      if (Chart_node1.series[0].data.length > 40) {
        Chart_node1.series[0].addPoint([x, Humidity1], true, true, true);
      } else {
        Chart_node1.series[0].addPoint([x, Humidity1], true, false, true);
      }

      if (Chart_node1.series[1].data.length > 40) {
        Chart_node1.series[1].addPoint([x, Temperature1], true, true, true);
      } else {
        Chart_node1.series[1].addPoint([x, Temperature1], true, false, true);
      }

      if (Chart_node2.series[0].data.length > 40) {
        Chart_node2.series[0].addPoint([x, AirQuality], true, true, true);
      } else {
        Chart_node2.series[0].addPoint([x, AirQuality], true, false, true);
      }
      if (Chart_node2.series[1].data.length > 40) {
        Chart_node2.series[1].addPoint([x, DustHumidity], true, true, true);
      } else {
        Chart_node2.series[1].addPoint([x, DustHumidity], true, false, true);
      }
    }
  };
  xhttp.open("GET", "readADC", true);
  xhttp.send();
}, 1000 * 5);

//Button toggle fan

const handleClickToggle = (nameToggle, nameDevice) => {
  let toggle = document.querySelector(nameToggle);
  let fan = document.querySelector(nameDevice);

  if (!Object.values(toggle.classList).includes("toggle-on")) {
    toggle.classList.add("toggle-on");
    fan.style.animationDuration = 0.1 + "s";
  } else {
    toggle.classList.remove("toggle-on");
    fan.style.animationDuration = 0 + "s";
  }
};

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
