const searchBtn = document.getElementById('search');
const userInput = document.getElementById('locationInput');
const APIKEY = '4c8f9c624f821eb34cdc733259748f7a';

function searchButtonHandler() {
  if (!userInput.value) {
    alert('Please enter valid data!');
    return;
  }
  const usrInput = userInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${usrInput}&units=metric&appid=${APIKEY}`;
  console.log('User entered: ' + usrInput);
  getWeatherInfo(apiUrl);
  userInput.value = '';
}

function updateDOM(elId, content) {
  document.getElementById(elId).textContent = `${content}`;
}

function setWeatherIcon(imgCode) {
  const weatherPic = document.getElementById('weather-pic');
  const iconUrl = `https://openweathermap.org/img/wn/${imgCode}@2x.png`;
  weatherPic.src = iconUrl;
  weatherPic.style.display = 'inline';
}

function getWeatherInfo(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        alert(`City not found, try again!`);
        throw new Error('City not found!');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setWeatherIcon(data.weather[0].icon);
      updateDOM('location', data.name);
      updateDOM('temperature', `${Math.floor(data.main.temp)}°C`);
      updateDOM('weather-desc', data.weather[0].description);
    })
    .catch((error) => {
      console.log(error);
    });
}

searchBtn.addEventListener('click', searchButtonHandler);
