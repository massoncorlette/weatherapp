import { format } from "date-fns";
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

//1200 x 300
//Convert all temps to celsius or a second API request? 

let location = null;
let bodySelect = document.querySelector('body');

// entry function from index
export function initializeApp() {
  let submitBtn = document.querySelector('#submitbtn');

  const defaultLocation = "London";
  queryForData(defaultLocation);

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

// displaying data
// DOM functions
function displayWeatherData(data) {

  let celsius = false;
  
  const description = displayDayOfForecast(data).displayDayOfDescription();
  const currentCondtion = displayDayOfForecast(data).getCurrentCondition();
  const todayTemp = displayDayOfForecast(data, celsius).getAvg();
  const todayHigh = displayDayOfForecast(data).getHigh();
  const todayLow = displayDayOfForecast(data).getLow();
  const todayVisible = displayDayOfForecast(data).getVisibility();
  const todayClouds = displayDayOfForecast(data).getCloudCoverage();
  
  console.log(todayTemp);
  console.log(todayHigh);
  console.log(todayLow);
  console.log(description);

  const bgGif = document.createElement('img');
  const weatherDiv = document.createElement('div');
  const gifDiv = document.createElement('div');

  bgGif.id = 'bgGif';
  weatherDiv.id = 'currentWeatherDiv';
  gifDiv.id = 'gifDiv';

  gifDiv.appendChild(bgGif);
  weatherDiv.appendChild(gifDiv);
  
  bodySelect.appendChild(weatherDiv);
  
  const gifToDisplay = displayGif(currentCondtion, todayTemp, todayVisible, todayClouds);
  bgGif.src = gifToDisplay;

  displaySevenDayForecast(data);
};

function displaySevenDayForecast(data) {
  for (let i = 0; i < data.days.length; i++) {
    console.log(data.days[i])
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
    let condition = data.currentConditions.icon;
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

  function getVisibility() {
    const visible = data.days[0].visibility;
    return visible;
  }

  function getCloudCoverage() {
    const cloudy = data.days[0].cloudcover;
    return cloudy;
  }

  return {
    getCurrentCondition:getCurrentCondition,
    getAvg:getAvg,
    getHigh:getHigh,
    getLow:getLow,
    displayDayOfDescription:displayDayOfDescription,
    getVisibility:getVisibility,
    getCloudCoverage:getCloudCoverage,
  }
};

