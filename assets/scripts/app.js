const searchBtn = document.getElementById('search');
const userInput = document.getElementById('locationInput');
const APIKEY = '4c8f9c624f821eb34cdc733259748f7a';
const apiurl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${APIKEY}`;

function searchButtonHandler() {
  if (!userInput.value) {
    alert('Please enter valid data!');
    return;
  }
  const usrInput = userInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${usrInput}&appid=${APIKEY}`;
  console.log(usrInput);
  getUserCoords(apiUrl);
  userInput.value = '';
}

function getUserCoords(url) {
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
    })
    .catch((error) => {
      console.log(error);
    });
}

searchBtn.addEventListener('click', searchButtonHandler);
