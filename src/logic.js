import { getDay } from "date-fns";
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
  const day = getCurrentDate();
  console.log(day);
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
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
  const currentDate = getDay(new Date());

  return daysOfWeek[currentDate];
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

export function storeSevenDayForecast(data) {
  const sevenDayForecast = [];
  for (let i = 0; i < data.days.length; i++) {
    sevenDayForecast.push(data.days[i]);
  }
  console.log(sevenDayForecast);
  return sevenDayForecast;
};

export function storeDayOfForecast(data) {
  const dayOfForecast = [];
  dayOfForecast.push(data.days[0]);
  return dayOfForecast;
}

