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

import SnowIcon from './WeatherIcons/snowy-6.svg'; import SnowDayIcon from './WeatherIcons/snowy-2.svg';
import ThunderstormsIcon from './WeatherIcons/thunder.svg'; import RainIcon from './WeatherIcons/rainy-5.svg';
import RainDayIcon from './WeatherIcons/rainy-2.svg'; import FogIcon from './WeatherIcons/cloudy.svg';
import CloudyDayIcon from './WeatherIcons/cloudy-day-1.svg'; import CloudyNightIcon from './WeatherIcons/cloudy-night-1.svg';
import ClearDayIcon from './WeatherIcons/day.svg'; import ClearNightIcon from './WeatherIcons/night.svg';
import { allDayOfData as allDayOfData, storeSevenDayForecast, storeDayOfForecast, queryForData, getCurrentDay } from "./logic";
import { format,parse } from "date-fns";
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

let loaded = false;
//DOM functions to setup Containers
function setupDisplayContainers() {
  if (!loaded) {
    loaded = true;
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
    recordTxt.textContent = 'Live View';
    recordDiv.appendChild(recordGif);
    recordDiv.appendChild(recordTxt);
  
    const dayOfDetailsContainer = document.createElement('div');
    dayOfDetailsContainer.id = 'dayOfDetailsContainer';
  
    const dayOfForecastContainer = document.createElement('div');
    dayOfForecastContainer.id = 'dayOfForecastContainer';
    dayOfForecastContainer.classList.add('scroll');
  
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
  }
 
  function resetDisplay(parentElement) {
    if(parentElement.firstChild) {
      while (parentElement.children.length > 0) {
        parentElement.removeChild(parentElement.firstChild);
      }
    } else {
      return;
    }
  };  

  function setupDayOfDetailsDisplay(measure,stat,unit) {
   
    const measurementContainer = document.createElement('div');
    measurementContainer.id = 'measurementContainer';

    if (unit) {
      measurementContainer.textContent = `${measure} ${stat} ${unit}`;
    } else {
      measurementContainer.textContent = `${measure} ${stat}`;
    }
    return measurementContainer;
  };

  function setupDayOfForecastDisplay(hour,temp,icon,rainchance) {

    const measurementContainerHour = document.createElement('div');
    measurementContainerHour.classList.add('measurementContainerHour');

    const hourContainer = document.createElement('div');
    hourContainer.id = 'hourContainer';
    hourContainer.innerText = hour;
    const precipContainer = document.createElement('div');

    precipContainer.id = 'precipContainer';
    if (rainchance) {
      precipContainer.innerText = rainchance;
    }
    const iconContainer = document.createElement('div');
    iconContainer.id = 'iconContainer';
    const iconSvg = document.createElement('img');
    iconSvg.id = 'iconSvg';
    iconSvg.src = icon;
    iconContainer.appendChild(iconSvg);
    const currentTempContainer = document.createElement('div');
    currentTempContainer.id = 'currentTempContainer';
    currentTempContainer.innerText = temp;

    measurementContainerHour.appendChild(hourContainer);
    measurementContainerHour.appendChild(precipContainer);
    measurementContainerHour.appendChild(iconContainer);
    measurementContainerHour.appendChild(currentTempContainer);

    return measurementContainerHour;
  };

  function setupWeekForecastDisplay(day, icon, rainchance, humidity, avg, high, low) {

    const measurementContainerWeekDay = document.createElement('div');
    measurementContainerWeekDay.classList.add( 'measurementContainerWeekDay');


    const daytxt = document.createElement('p');
    daytxt.innerText = day;
    const dayContainer = document.createElement('div');
    dayContainer.classList.add('dayContainer');
    dayContainer.appendChild(daytxt);

    const iconContainer = document.createElement('div');
    const iconSvg = document.createElement('img');
    iconSvg.id = 'iconSvgDay';
    iconSvg.src = icon;

    const rainContainer = document.createElement('div');
    rainContainer.innerText = rainchance;
    const humidContainer = document.createElement('div');
    humidContainer.innerText = humidity;
    const lowContainer = document.createElement('div');
    lowContainer.innerText = low;
    const avgContainer = document.createElement('div');
    avgContainer.innerText = avg;
    const highContainer = document.createElement('div');
    highContainer.innerText = high;

    iconContainer.appendChild(iconSvg);

    const className = 'dayStat';

    dayContainer.classList.add(className);
    iconContainer.classList.add(className);
    rainContainer.classList.add(className);
    humidContainer.classList.add(className);
    lowContainer.classList.add(className);
    avgContainer.classList.add(className);
    highContainer.classList.add(className);

    measurementContainerWeekDay.appendChild(dayContainer);
    measurementContainerWeekDay.appendChild(iconContainer);
    measurementContainerWeekDay.appendChild(rainContainer);
    measurementContainerWeekDay.appendChild(humidContainer);
    measurementContainerWeekDay.appendChild(lowContainer);
    measurementContainerWeekDay.appendChild(avgContainer);
    measurementContainerWeekDay.appendChild(highContainer);

    return measurementContainerWeekDay;
  };

  return {
    setupDayOfDetailsDisplay:setupDayOfDetailsDisplay,
    setupDayOfForecastDisplay:setupDayOfForecastDisplay,
    setupWeekForecastDisplay:setupWeekForecastDisplay,
    resetDisplay:resetDisplay
  }
};

// DOM functions to display Data inside Containers
export const displayWeatherData = function(data) {

  const conditionAndLocation = document.querySelector('#conditionAndLocation');
  const conditionLow = document.querySelector('#tempLow');
  const conditionAvg = document.querySelector('#tempMiddleSection');
  const conditionHigh = document.querySelector('#tempHigh');
  const dayOfContainer = document.querySelector('#dayOfContainer');
  const dayOfDetailsContainer = document.querySelector('#dayOfDetailsContainer');
  const dayOfForecastContainer = document.querySelector('#dayOfForecastContainer');
  const weekForecastContainer = document.querySelector('#weekForecastContainer');

  const tempHighLow = document.querySelector('#tempHighLow');
  const dayDescription = document.querySelector('#dayDescription');

  // clearing containers
  setupDisplayContainers().resetDisplay(dayOfDetailsContainer);
  setupDisplayContainers().resetDisplay(dayOfForecastContainer);
  setupDisplayContainers().resetDisplay(conditionAndLocation);
  setupDisplayContainers().resetDisplay(conditionLow);
  setupDisplayContainers().resetDisplay(conditionAvg);
  setupDisplayContainers().resetDisplay(conditionHigh);
  setupDisplayContainers().resetDisplay(weekForecastContainer);

  // getting all 'current' weatherData
  let celsius = false;
  let getForecastData = allDayOfData(data, celsius, 0);
  let dayOfCondition = getForecastData.dayOfCondition;
  let currentCondition = getForecastData.currentCondition;
  let currentTemp = parseInt(getForecastData.currentTemp);
  let tempLow = getForecastData.todayLow;
  let tempAvg = getForecastData.todayAvg;
  let tempHigh = getForecastData.todayHigh;
  let currentVisibility = parseInt(getForecastData.currentVisibility);
  let todayClouds = getForecastData.todayClouds;
  let currentRain = getForecastData.currentRain;
  let currentHumid = getForecastData.currentHumidity;
  let currentWind = getForecastData.currentWind;
  let currentSevere = getForecastData.currentSevere;

  // gifContainer
  const bgGif = document.querySelector('#bgGif');
  const gifToDisplay = displayGif(currentCondition, currentTemp, currentVisibility, todayClouds);
  bgGif.src = gifToDisplay;

  // dayOfContainer
  const locationResolved = data.resolvedAddress;
  conditionAndLocation.textContent = dayOfCondition + " in " + locationResolved;

  const conditionLowDiv = document.createElement('div');
  conditionLowDiv.textContent = tempLow + " L°";
  conditionLow.appendChild(conditionLowDiv);

  let avgTxt = document.createElement("div");
  let tempTxt = document.createElement("div");
  avgTxt.textContent = "Avg";
  tempTxt.textContent = tempAvg + " °"
  conditionAvg.appendChild(avgTxt);
  conditionAvg.appendChild(tempTxt);
  
  const conditionHighDiv = document.createElement('div');
  conditionHighDiv.textContent = tempHigh + " H°";
  conditionHigh.appendChild(conditionHighDiv);

  function displayDayOf(measure,stat,unit) {

    let addedMetric = null;
    if (unit) {
      addedMetric = setupDisplayContainers().setupDayOfDetailsDisplay(measure,stat,unit);
    } else {
      addedMetric = setupDisplayContainers().setupDayOfDetailsDisplay(measure,stat,unit);
    }
    dayOfDetailsContainer.appendChild(addedMetric);
  }

  function displayHourly(hour,temp,rainchance,condition) {
    const addedIcon = displayWeatherIcon(condition);
    const addedHourlyMetric = setupDisplayContainers().setupDayOfForecastDisplay(hour,temp,addedIcon,rainchance);

    dayOfForecastContainer.appendChild(addedHourlyMetric);
  }

  function displayWeekly(day,rainchance,humidity,low,avg,high,condition) {
    const addedIcon = displayWeatherIcon(condition);
    const addedWeeklyMetric = setupDisplayContainers().setupWeekForecastDisplay(day,addedIcon,rainchance,humidity,avg,high,low,condition);

    weekForecastContainer.appendChild(addedWeeklyMetric);
  }
  storeDayOfForecast(data);
  storeSevenDayForecast(data);

  // IIFE's
  for (let i=0; i<24;i++) {
    let getHourData = allDayOfData(data,celsius,0,i);
    let hourData = getHourData.dayOfHoursData;
    const parsedTime = parse(hourData.datetime, 'HH:mm:ss', new Date());

    let displayTime = format(parsedTime, 'hh:mm:ss a');
    displayHourly(displayTime,hourData.temp,hourData.precipprob,hourData.icon);
  }
  const getOrderedDaysOfWeek = getCurrentDay();
  for (let i=0;i<7;i++) {
    let getDayData = allDayOfData(data,celsius,i);
    console.log(getDayData);
    let dayOfWeek = getOrderedDaysOfWeek[i];

    displayWeekly(dayOfWeek,getDayData.dayOfRain,getDayData.dayOfHumidity,getDayData.todayLow,getDayData.todayAvg,getDayData.todayHigh,getDayData.forecastCondition);
  }
  const rainTxt = "Rain";
  const percentUnit = "%";
  displayDayOf(rainTxt,currentRain,percentUnit);

  const humidTxt = "Humidity";
  displayDayOf(humidTxt,currentHumid,percentUnit);

  const windTxt = "Wind";
  const windUnit = "KT";
  displayDayOf(windTxt, currentWind,windUnit);

  const visibleTxt = "Visibility";
  const visibleUnit = "KM";
  displayDayOf(visibleTxt, currentVisibility,visibleUnit);

  const severeTxt = "Severe";
  displayDayOf(severeTxt, currentSevere, percentUnit);
  
  return {
    displayDayOf:displayDayOf,
    displayHourly:displayHourly,
  }
};

function displayWeatherIcon(condition) {
  switch (condition) {
    case "snow":
      return SnowIcon;
    case "snow-showers-day":
      return SnowDayIcon;
    case "snow-showers-night":
      return SnowIcon;
    case "thunder-rain":
      return ThunderstormsIcon;
    case "thunder-showers-day":
      return ThunderstormsIcon;
    case "thunder-showers-night":
      return ThunderstormsIcon;
    case "rain":
      return RainIcon;
    case "showers-day":
      return RainDayIcon;
    case "showers-night":
      return RainIcon;
    case "fog":
      return FogIcon;
    case "wind":
      return FogIcon;
    case "cloudy":
      return FogIcon;
    case "partly-cloudy-day":
      return CloudyDayIcon;
    case "partly-cloudy-night":
      return CloudyNightIcon;
    case "clear-day":
      return ClearDayIcon;
    case "clear-night":
      return ClearNightIcon;
    default:
      return CloudyDayIcon;
  }
}

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
  } else if (condition === "cloudy") {
    return landgrey;
  }
  else if (condition === "partly-cloudy-night" || condition === "clear-night") {
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









