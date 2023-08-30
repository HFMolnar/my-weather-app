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

//console.log(formatDate(new Date()));

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = formatDate(new Date());

//

function showTemp(response) {
  console.log(response);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let todaysTemp = document.querySelector("#todays-temp");
  let todaysDetails = document.querySelector("#todays-details");
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let rainFall = document.querySelector("#rain-fall");
  todaysTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  highTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  lowTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
  rainFall.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  todaysDetails.innerHTML = `Today is ${response.data.weather[0].description}`;
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${searchInput.value}`;
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", submitSearch);

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
