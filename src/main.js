import { format } from "date-fns";

//Focus on DOM elements and UI last!

let location = null;

// entry function from index
export function initializeApp() {
  let submitBtn = document.querySelector('#submitbtn');
  
  submitBtn.addEventListener('click', (event) => {
    location = document.querySelector('#locationInput').value;
    event.preventDefault();
    queryForData(location);
  }); 
}

// dealing with Promise object
async function queryForData(selectedLocation) { 
  try {
    const weatherData = await retrieveWeatherData(selectedLocation);
    console.log(weatherData);
    displayWeatherData(weatherData);
  } catch(error) {
    console.log(error);
  }
};

function getCurrentDate() {
  const currentDate = new Date();

  const formattedDate = format(currentDate, 'MM-dd');

  return formattedDate;
};

// return Promise object
async function retrieveWeatherData(selectedLocation) {
  const date = getCurrentDate();
  console.log(date);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedLocation}/next7days?key=F9HSLGSNS2LUJYXZA84KV9H2M`;
  
  try {
    const data = await fetch(url, { mode: 'cors' });
    if (!data.ok) {
      throw new Error(`Response status: ${data.status}`);
    }
    const weatherData = await data.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

// displaying data
function displayWeatherData(data) {
  const container = document.createElement('div');
  container.classList.add('weather-data-container');

  let description = document.createElement('p');
  description.textContent = displayDayOfDescription(data);
  displayDayOfForecast(data);
  console.log(dayForecast);

  container.appendChild(description);

  document.body.appendChild(container);
};

let dayForecast = [];
function displayDayOfForecast(data) {
  dayForecast = [];
  for (let i = 0; i < data.days.length; i++) {
    dayForecast.push(data.days[i].temp)
  }
};

function displayDayOfDescription(data) {
  const description = data.days[0].description;
  return description;
};

function displaySevenDayForecast(data) {

};

function switchCelFar(data) {

};