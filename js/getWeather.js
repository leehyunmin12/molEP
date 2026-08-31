import config from "./config.js";

const { OPEN_WEATHER_API_KEY } = config;

const getSuccess = async (position) => {
  console.log(position);
  const lon = position.coords.longitude;
  const lat = position.coords.latitude;

  let lon2 = 126.932909088854
  let lat2 = 37.4664154661249

  console.log(lon2, lat2);
  const OPEN_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=kr`;

  console.log(OPEN_WEATHER_URL)

  try {
    const response = await fetch(OPEN_WEATHER_URL);
    if (!response.ok) {
      throw new Error(`에러 발생 ${response.status}`);
    }

    const data = await response.json();

    const weather = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;

    document.getElementById("weather").innerText = weather;
    document.getElementById("temperature").innerText = parseInt(temp) + "도";
    document.getElementById("humidity").innerText = humidity + "%";
    
    console.log(weather, temp);
  } catch (e) {
    console.log("예외가 발생하였습니다. " + e);
  }
};

const getError = () => {
  console.log("Error 발생");
};

const options = () => {
  enableHighAccuracy: true;
  timeout: 10000;
};

window.navigator.geolocation.getCurrentPosition(getSuccess, getError, options);
