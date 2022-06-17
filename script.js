let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentMinute = String(date.getMinutes()).padStart(2, "0");
  let currentHour = date.getHours();

  let formattedDate = `${currentDay} ${currentHour}:${currentMinute} `;

  return formattedDate;
}

let theTime = document.querySelector("h4");
theTime.innerHTML = formatDate(currentTime);

//search for city

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentLocation = document.querySelector("#city-location");
  currentLocation.innerHTML = `${searchInput.value}`;
  let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(searchInput);

  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

let now = new Date();

formatDate(now);

function displayWeather(response) {
  let weatherDiv = document.querySelector("#weather");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${temperature.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(temperature);
  console.log(response.data.name);

  weatherDiv.innerHTML = `It is ${temperature} degrees in ${city}`;
  axios.get(apiUrl).then(displayWeather);
}

function retrievePosition(position) {
  let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  //let units = "metric";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(latitude);
  console.log(longitude);
  axios.get(apiUrl).then(displayWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
