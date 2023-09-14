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
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  tempC.classList.remove("active");
  tempF.classList.add("active");
  let todaysTemp = document.querySelector("#todays-temp");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  todaysTemp.innerHTML = `${Math.round(farenheitTemp)}°F`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  tempC.classList.add("active");
  tempF.classList.remove("active");
  let todaysTemp = document.querySelector("#todays-temp");
  todaysTemp.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusTemperature = null;

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitSearch);

let tempF = document.querySelector("#fahrenheit");
tempF.addEventListener("click", showFahrenheitTemp);

let tempC = document.querySelector("#celsius");
tempC.addEventListener("click", showCelsiusTemp);

//

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function submitCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityButton = document.querySelector("#current-city-search");
currentCityButton.addEventListener("click", submitCurrent);
