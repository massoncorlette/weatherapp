import { format } from "date-fns";
import fogStorm from './images/fogstorm.gif';

//Convert all temps to celsius or a second API request? 

let location = null;
let bodySelect = document.querySelector('body');

// entry function from index
export function initializeApp() {
  let submitBtn = document.querySelector('#submitbtn');

  const bgGif = document.createElement('img');
  const weatherDiv = document.createElement('div');
  const gifDiv = document.createElement('div');

  bgGif.src = fogStorm;
  bgGif.id = 'bgGif';
  weatherDiv.id = 'currentWeatherDiv';
  gifDiv.id = 'gifDiv';

  gifDiv.appendChild(bgGif);
  weatherDiv.appendChild(gifDiv);
  
  bodySelect.appendChild(weatherDiv);

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
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedLocation}/next7days?iconSet=icons2&key=F9HSLGSNS2LUJYXZA84KV9H2M`;
  
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

const displayDayOfForecast = function (data, celsius) {
  function getCurrentCondition() {
    let condition = data.days[0].icon;
    return condition;
  };

  function getAvg() {
    let temp = parseInt(data.days[0].temp);
    if (celsius) {
      temp = (temp - 30) / 2;
      return temp;
    } else {
      return temp;
    }
  };

  function getHigh() {
    let high = parseInt(data.days[0].tempmax);
    if (celsius) {
      high = (high - 30) / 2;
      return high;
    } else {
      return high;
    }
  };

  function getLow() {
    let low = parseInt(data.days[0].tempmin);
    if (celsius) {
      low = (low - 30) / 2;
      return low;
    } else {
      return low;
    }
  };

  function displayDayOfDescription() {
    const description = data.days[0].description;
    return description;
  };

  return {
    getCurrentCondition:getCurrentCondition,
    getAvg:getAvg,
    getHigh:getHigh,
    getLow:getLow,
    displayDayOfDescription:displayDayOfDescription,
  }
};

// displaying data
// DOM functions
function displayWeatherData(data) {

  let celsius = true;
  
  const description = displayDayOfForecast(data).displayDayOfDescription();
  const currentCondtion = displayDayOfForecast(data).getCurrentCondition();
  const todayTemp = displayDayOfForecast(data, celsius).getAvg();
  const todayHigh = displayDayOfForecast(data).getHigh();
  const todayLow = displayDayOfForecast(data).getLow();
  
  console.log(todayTemp);
  console.log(todayHigh);
  console.log(todayLow);
  console.log(description);
  console.log(currentCondtion);

  displaySevenDayForecast(data);
};

function displaySevenDayForecast(data) {
  for (let i = 0; i < data.days.length; i++) {
    console.log(data.days[i])
  }
};

function displayGif(icontxt) {

};
