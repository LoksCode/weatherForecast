const searchBtn = document.getElementById('search');
const locateBtn = document.getElementById('locateMe');
const userInput = document.getElementById('locationInput');
const APIKEY = ''; // place where you put openweather API key

function getWeatherInfo(url) {
  //in this function we send a GET request
  fetch(url)
    .then((response) => {
      // in the response there is various data about given city / country
      if (!response.ok) {
        alert(`City not found, try again!`);
        throw new Error('City not found!');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // recieving data and filtering it.
      setWeatherIcon(data.weather[0].icon);
      updateDOM('location', data.name);
      updateDOM('temperature', `${Math.floor(data.main.temp)}°C`);
      updateDOM('weather-desc', data.weather[0].description);
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateDOM(elId, content) {
  // this function updates the content in the DOM
  document.getElementById(elId).textContent = `${content}`;
}

function setWeatherIcon(imgCode) {
  // Api has dedicated paths for various icons
  const weatherPic = document.getElementById('weather-pic');
  const iconUrl = `https://openweathermap.org/img/wn/${imgCode}@2x.png`;
  weatherPic.src = iconUrl;
  weatherPic.style.display = 'inline';
}

function searchButtonHandler() {
  // this handles the button, and triggers function to send the request
  if (!userInput.value) {
    alert('Please enter valid city name!');
    return;
  }
  const usrInput = userInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${usrInput}&units=metric&appid=${APIKEY}`;
  console.log('User entered: ' + usrInput);
  getWeatherInfo(apiUrl);
  userInput.value = '';
}

function locateButtonHandler() {
  //this triggers the button but also uses browser API to locate the user.
  const geoLocation = navigator.geolocation.getCurrentPosition(
    (data) => {
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`;
      getWeatherInfo(url);
    },
    (error) => {
      alert(error.message);
    }
  );
}

searchBtn.addEventListener('click', searchButtonHandler);
locateBtn.addEventListener('click', locateButtonHandler);
