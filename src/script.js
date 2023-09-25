function formatDate() {
  let now = new Date();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let date = now.getDate();
  let day = now.getDay();
  let month = now.getMonth();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  month = months[now.getMonth()];

  return `${day} ${date} ${month}, ${hour}:${min} `;
}

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = formatDate(new Date());

//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast .col-12");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="row"><div class="col forecast-day">
                <span>${formatDay(forecastDay.dt)}</span>
              </div>
              <div class="col forecast-icon">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="small-symbol"
                  width="60px"
                />
              </div>
              <div class="col forecast-temp">
                <span class = "weather-forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}°C </span>
                <span class = "weather-forecast-temperature-min"> ${Math.round(
                  forecastDay.temp.min
                )}°C </span>
              </div>
              </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response);
  let cityName = document.querySelector("#city-name");
  let todaysTemp = document.querySelector("#todays-temp");
  let todaysDetails = document.querySelector("#todays-details");
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let rainFall = document.querySelector("#rain-fall");
  let iconElement = document.querySelector("#main-icon");

  celsiusTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  todaysTemp.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  todaysDetails.innerHTML = `Today is ${response.data.weather[0].description}`;
  highTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  lowTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
  rainFall.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function submitSearch(city) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  submitSearch(cityInputElement.value);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitSearch);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function submitCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityButton = document.querySelector("#current-city-search");
currentCityButton.addEventListener("click", submitCurrent);

submitSearch("London");
