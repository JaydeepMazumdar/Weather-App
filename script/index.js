let inputVal = document.getElementById("city");
let btn = document.getElementById("butn");
let txt = document.querySelector(".tday");
let clouds;

const fetchingData = (currUrl) => {
  fetch(currUrl)
    .then((response) => response.json())
    .then((data) => {
      let a = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      let d = new Date(data.dt * 1000);
      let t = new Intl.DateTimeFormat("en-US", {
        hour12: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      let st = new Date(data.sys.sunset * 1000).toTimeString();
      let sr = new Date(data.sys.sunrise * 1000).toTimeString();
      sunst = st.split(":")[0] + ":" + st.split(":")[1];
      sunsr = sr.split(":")[0] + ":" + sr.split(":")[1];
      //   console.log(data);
      let myString = `<h2><i class="fa-solid fa-location-dot"></i> ${
        data.name
      }</h2>
        <div class="box_1">
        <div class="leftbox">
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="Weather icon"> <span>${data.weather[0].main}</span>
        </div>
        <div class="rightbox">
        <h2 class="tmp"><i class="fa-solid fa-temperature-half"></i> ${
          data.main.temp
        }°C</h2>
        <h3>feels like ${data.main.feels_like}°C </h3>
        <div class="dt">Date : ${a.format(d)}</div>
        </div>
        </div>
        <div class="box2">
            <div class="boxes">
            <i class="fa-solid fa-wind"></i><div class = atrb> Wind Speed</div>
            <div class="num">${data.wind.speed} m/s</div>
            </div>
            <div class="boxes">
            <i class="fa-solid fa-droplet"></i><div class = atrb> Humidity</div>
            <div class="num">${data.main.humidity} %</div>
            </div>
            <div class="boxes">
            <i class="fa-solid fa-arrows-down-to-line"></i><div class = atrb> Air Pressure</div>
            <div class="num">${data.main.pressure} hPa</div>
            </div>
            <div class="boxes">
            <i class="fa-solid fa-cloud"></i><div class = atrb>Cloudiness </div>
            <div class="num">${data.clouds.all} %</div>
            </div>
            <div class="boxes">
            <i class="fa-solid fa-sun"></i><div class = atrb> Sunrise</div>
            <div class="num">${sunsr} AM</div>
            </div>
            <div class="boxes">
            <i class="fa-solid fa-cloud-sun"></i><div class = atrb> Sunset</div>
            <div class="num">${sunst} PM</div>
            </div>
        </div>`;
      txt.innerHTML = myString;
    })
    .catch(() => alert("Please input a proper city name !!!..."));
};

const success = (position) => {
  const currUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    position.coords.latitude +
    "&lon=" +
    position.coords.longitude +
    "&units=metric&appid=75af0154423dfab7a77f3ac86dc09933";
  fetchingData(currUrl);
};

navigator.geolocation.getCurrentPosition(success, () =>
  alert("Cannot detect your location !!!...")
);

btn.addEventListener("click", () => {
  var city = inputVal.value.trim();
  const currUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=75af0154423dfab7a77f3ac86dc09933";
  fetchingData(currUrl);
});

inputVal.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    var city = inputVal.value.trim();
    console.log(city);
    const currUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=75af0154423dfab7a77f3ac86dc09933";
    fetchingData(currUrl);
  }
});
