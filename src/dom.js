import landblue from './images/landscapeblue.png'; import landgrey from './images/landscapegrey.png';
import landfog from './images/landscapefog.png';  import landnight from './images/landscapenight.png';
import landgreen from './images/landscapegreen.png'; import landyellow from './images/landscapeyellow.png';
import cloudyRain from './images/cloudyrain.gif'; import cloudyStorm from './images/cloudystorm.gif';
import fogRain from './images/fograin.gif'; import fogStorm from './images/fogstorm.gif'; 
import nightRain from './images/nightrain.gif'; import nightSnow from './images/nightsnow.gif';
import nightStorm from './images/nightstorm.gif'; import overcastSnow from './images/overcastsnow.gif';
import springRain from './images/springrain.gif'; import springStorm from './images/springstorm.gif';
import summerRain from './images/summerrain.gif'; import summerStorm from './images/summerstorm.gif';
import winterRain from './images/winterrain.gif'; import winterSnow from './images/wintersnow.gif';
import cloudSunIcon from './images/cloud-sun.svg';

import { displayForecast, storeSevenDayForecast, storeDayOfForecast, queryForData } from "./logic";

//1200 x 300
//Convert all temps to celsius or a second API request? 

let location = null;
let bodySelect = document.querySelector('body');

// entry function from index
export function initializeApp() {
  let submitBtn = document.querySelector('#submitbtn');

  const iconLogo = document.getElementById('iconLogo');
  const imgElement = document.createElement('img');
  imgElement.src = cloudSunIcon;
  iconLogo.appendChild(imgElement);

  const defaultLocation = "Colombia";
  queryForData(defaultLocation);

  submitBtn.addEventListener('click', (event) => {
    location = document.querySelector('#locationInput').value;
    event.preventDefault();
    queryForData(location);
  }); 
}

// displaying data
// DOM function
export const displayWeatherData = function(data) {

  let celsius = false;
  const currentTemp = parseInt(data.currentConditions.temp); 
  const currentCondition = data.currentConditions.conditions;
  const dayOfCondition = displayForecast(data,celsius, 0).getCurrentCondition();
  const todayHigh = displayForecast(data,celsius, 0).getHigh();
  const todayLow = displayForecast(data,celsius, 0).getLow();
  const todayVisible = displayForecast(data,celsius, 0).getVisibility();
  const todayClouds = displayForecast(data,celsius,0).getCloudCoverage();

  function displayDayOf(currentTemp,condition,high,low) {
    
  }

  function displaySevenDay() {

  }
  
  console.log(currentCondition);
  console.log(todayHigh);
  console.log(todayLow);

  const bgGif = document.createElement('img');
  const weatherDiv = document.createElement('div');
  const gifDiv = document.createElement('div');

  bgGif.id = 'bgGif';
  weatherDiv.id = 'currentWeatherDiv';
  gifDiv.id = 'gifDiv';

  gifDiv.appendChild(bgGif);
  weatherDiv.appendChild(gifDiv);
  
  bodySelect.appendChild(weatherDiv);
  
  const gifToDisplay = displayGif(dayOfCondition, currentTemp, todayVisible, todayClouds);
  bgGif.src = gifToDisplay;

  storeDayOfForecast(data);
  storeSevenDayForecast(data);

  // Probably can go ahead and IIFE inside this module instead of having to call them in index
  return {
    displayDayOf:displayDayOf,
    displaySevenDay:displaySevenDay,
  }
};

function displayGif(condition,temp, visibility,cloudy) {
  if (condition === "snow-showers-day") {
    if (cloudy > 85) {
      return overcastSnow;
    } else {
      return winterSnow;
    }
  } else if (condition === "snow-showers-night") {
    return nightSnow;
  } else if (condition === "thunder-showers-day") {
    if (visibility < 1) {
      return fogStorm;
    }
    if (cloudy > 80) {
      return cloudyStorm;
    }
    else if (temp < 70 && temp > 50) {
      return springStorm;
    } else if (temp >= 70) {
      return summerStorm;
    }
  } else if (condition === "thunder-showers-night") {
    if (visibility < 1) {
      return fogStorm;
    } else {
      return nightStorm;
    }
  } else if (condition === "showers-day") {
    if (cloudy > 80) {
      return cloudyRain;
    }
    if (temp < 70 && temp > 50) {
      return springRain;
    } else if (temp <= 50 && temp > 32) {
      return winterRain;
    } else if (temp >= 70) {
      return summerRain;
    }
  } else if (condition === "showers-night") {
    if (visibility < 1) {
      return fogRain;
    } else {
      return nightRain;
    }
  } else if (condition === "fog") {
    return landfog;
  } else if (condition === "partly-cloudy-night" || condition === "clear-night") {
    return landnight;
  } else if (condition === "partly-cloudy-day" || condition === "clear-day") {
    if (temp < 70 && temp > 50) {
      return landgreen;
    } else if (temp >= 70) {
      return landyellow;
    } else if (temp <= 50 && temp >= 40) {
      return landgrey;
    } else if (temp < 40) {
      return landblue;
    }    
  }
};









