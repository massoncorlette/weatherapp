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
import cloudSunIcon from './images/cloud-sun.svg'; import glowingRed from './images/glowingred.gif';

import { allDayOfData as allDayOfData, storeSevenDayForecast, storeDayOfForecast, queryForData } from "./logic";

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
  location = defaultLocation;

  setupDisplayContainers();
  queryForData(defaultLocation);

  submitBtn.addEventListener('click', (event) => {
    location = document.querySelector('#locationInput').value;
    event.preventDefault();
    queryForData(location);
  }); 
}

//DOM functions to setup Containers
function setupDisplayContainers() {
  const weatherDiv = document.createElement('div');
  weatherDiv.id = 'currentWeatherDiv';

  const dayOfContainer = document.createElement('div');
  const conditionAndLocation = document.createElement('div');
  const tempContainer = document.createElement('div');
  const tempLow = document.createElement('div');
  const tempMiddleSection = document.createElement('div');
  const tempHigh = document.createElement('div');
  const dayDescription = document.createElement('div');

  dayOfContainer.id = 'dayOfContainer';
  conditionAndLocation.id = 'conditionAndLocation';
  tempContainer.id = 'tempContainer';
  tempLow.id = 'tempLow';
  tempMiddleSection.id = 'tempMiddleSection';
  tempHigh.id = 'tempHigh'
  dayDescription.id = 'dayDescription';
  
  tempContainer.appendChild(tempLow);
  tempContainer.appendChild(tempMiddleSection);
  tempContainer.appendChild(tempHigh);

  dayOfContainer.appendChild(conditionAndLocation);
  dayOfContainer.appendChild(tempContainer);
  dayOfContainer.appendChild(dayDescription);

  const bgGif = document.createElement('img');
  bgGif.id = 'bgGif';
  const bgGifDiv = document.createElement('div');
  bgGifDiv.id = 'bgGifDiv';
  bgGifDiv.appendChild(bgGif);
  const recordGif = document.createElement('img');
  recordGif.src = glowingRed;
  recordGif.id = 'recordGif';
  const gifDiv = document.createElement('div');
  gifDiv.id = 'gifDiv';
  const recordDiv = document.createElement('div');
  recordDiv.id = 'recordDiv';
  const recordTxt = document.createElement('p');
  recordTxt.textContent = 'Live View ';
  recordDiv.appendChild(recordGif);
  recordDiv.appendChild(recordTxt);

  const dayOfDetailsContainer = document.createElement('div');
  dayOfDetailsContainer.id = 'dayOfDetailsContainer';

  const dayOfForecastContainer = document.createElement('div');
  dayOfForecastContainer.id = 'dayOfForecastContainer';

  const weekForecastContainer = document.createElement('div');
  weekForecastContainer.id = 'weekForecastContainer';

  weatherDiv.appendChild(dayOfContainer);
  gifDiv.appendChild(bgGifDiv);
  gifDiv.appendChild(recordDiv);
  weatherDiv.appendChild(gifDiv);
 
  bodySelect.appendChild(weatherDiv);
  bodySelect.appendChild(dayOfDetailsContainer);
  bodySelect.appendChild(dayOfForecastContainer);
  bodySelect.appendChild(weekForecastContainer);

  function setupDayOfDetailsDisplay(measure,stat,unit) {

    const measurementContainer = document.createElement('div');
    measurementContainer.id = 'measurementContainer';

    if (unit) {
      measurementContainer.textContent = `${measure} + " " + ${stat} + ${unit}`;
    } else {
      measurementContainer.textContent = `${measure} + " " + ${stat}`;
    }
    return measurementContainer;
  }

  function setupDayOfForecastDisplay(rainchance, icon, temp, high, low) {

  }

  function setupWeekForecastDisplay(day, icon, rainchance, humidity, temp, high, low) {

  }
  return {
    setupDayOfDetailsDisplay:setupDayOfDetailsDisplay,
    setupDayOfForecastDisplay:setupDayOfForecastDisplay,
    setupWeekForecastDisplay:setupWeekForecastDisplay
  }
}

// DOM functions to display Data inside Containers
export const displayWeatherData = function(data) {

  let celsius = false;
  let getForecastData = allDayOfData(data, celsius, 0);
  let dayOfCondition = getForecastData.dayOfCondition;
  let currentCondition = getForecastData.currentCondition;
  let currentTemp = getForecastData.currentTemp;
  let todayVisible = getForecastData.todayVisible;
  let todayClouds = getForecastData.todayClouds;

  const bgGif = document.querySelector('#bgGif');
  const gifToDisplay = displayGif(currentCondition, currentTemp, todayVisible, todayClouds);
  bgGif.src = gifToDisplay;

  const locationResolved = data.resolvedAddress;
  conditionAndLocation.textContent = dayOfCondition + " in " + locationResolved;

  const dayOfDetailsContainer = document.querySelector('#dayOfDetailsContainer');
  const dayOfForecastContainer = document.querySelector('#dayOfForecastContainer');
  const weekForecastContainer = document.querySelector('#weekForecastContainer');

  const conditionAndLocation = document.querySelector('#conditionAndLocation');
  const tempHighLow = document.querySelector('#tempHighLow');
  const dayDescription = document.querySelector('#dayDescription');

  function displayDayOf(measure,stat,unit) {
    const addedMetric = setupDisplayContainers.setupDayOfDetailsDisplay(measure,stat,unit);
    dayOfDetailsContainer.appendChild(addedMetric);
  }

  function displaySevenDay() {
  
  }
  storeDayOfForecast(data);
  storeSevenDayForecast(data);


  // Probably can go ahead and IIFE inside this module instead of having to call them in index
  return {
    displayDayOf:displayDayOf,
    displaySevenDay:displaySevenDay,
  }
};

function displayGif(condition,temp,visibility,cloudy) {
  if (condition === "snow-showers-day" || condition === "snow") {
    if (cloudy > 85) {
      return overcastSnow;
    } else {
      return winterSnow;
    }
  } else if (condition === "snow-showers-night") {
    return nightSnow;
  } else if (condition === "thunder-showers-day" || condition === "thunder-rain") {
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
  } else if (condition === "showers-day" || condition === "rain") {
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
  } else if (condition === "partly-cloudy-day" || condition === "clear-day" || condition === "windy") {
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









