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

import { format } from "date-fns";
import { displayWeatherData } from './dom';

// dealing with Promise object
export async function queryForData(selectedLocation) { 
  try {
    const weatherData = await retrieveWeatherData(selectedLocation);
    displayWeatherData(weatherData);
  } catch(error) {
    console.log(error);
  }
};

// return Promise object
export async function retrieveWeatherData(selectedLocation) {
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

function getCurrentDate() {
  const currentDate = new Date();

  const formattedDate = format(currentDate, 'MM-dd');

  return formattedDate;
};

//Using Index for forecasted days
export const displayForecast = function (data, celsius, index) {
  function getCurrentCondition() {
    let condition = data.currentConditions.icon;
    return condition;
  };

  function getAvg() {
    let temp = parseInt(data.days[index].temp);
    if (celsius) {
      temp = (temp - 30) / 2;
      return temp;
    } else {
      return temp;
    }
  };

  function getHigh() {
    let high = parseInt(data.days[index].tempmax);
    if (celsius) {
      high = (high - 30) / 2;
      return high;
    } else {
      return high;
    }
  };

  function getLow() {
    let low = parseInt(data.days[index].tempmin);
    if (celsius) {
      low = (low - 30) / 2;
      return low;
    } else {
      return low;
    }
  };

  function displayDayOfDescription() {
    const description = data.days[index].description;
    return description;
  };

  function getVisibility() {
    const visible = data.days[index].visibility;
    return visible;
  }

  function getCloudCoverage() {
    const cloudy = data.days[index].cloudcover;
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

export function displayGif(condition,temp, visibility,cloudy) {
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

