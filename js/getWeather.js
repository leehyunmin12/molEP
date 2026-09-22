const raw = sessionStorage.getItem("WeatherData");
const data = JSON.parse(raw);

const weather = data.weather[0].description;
const temp = data.main.temp;
const humidity = data.main.humidity;

document.getElementById("weather").innerText = weather;
document.getElementById("temperature").innerText = parseInt(temp) + "도";
document.getElementById("humidity").innerText = humidity + "%";

console.log(weather, temp, humidity);
