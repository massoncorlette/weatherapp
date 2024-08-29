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

function getCurrentDay() {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
  const currentDate = getDay(new Date());

  return daysOfWeek[currentDate];
};

export function allDayOfData(data, celsius, index, indexforhour) {
  const currentTemp = parseInt(data.currentConditions.temp); 
  const dayOfCondition = data.currentConditions.conditions;
  const currentCondition = weatherDataFunctions(data,celsius, index).getCurrentCondition();
  const todayAvg = weatherDataFunctions(data, celsius, index).getAvg();
  const todayHigh = weatherDataFunctions(data,celsius, index).getHigh();
  const todayLow = weatherDataFunctions(data,celsius, index).getLow();
  const currentVisibility = weatherDataFunctions(data,celsius, index).getVisibility();
  const todayClouds = weatherDataFunctions(data,celsius,index).getCloudCoverage();
  const currentRain = weatherDataFunctions(data,celsius,index).getRainChance();
  const currentHumidity = weatherDataFunctions(data,celsius,index).getHumidity();
  const currentWind = weatherDataFunctions(data,celsius,index).getWind();
  const currentSevere = weatherDataFunctions(data,celsius,index).getSeverity();
  const dayOfHoursData = weatherDataFunctions(data,celsius,index).getHoursData(indexforhour);

  return {
    currentTemp,
    currentCondition,
    dayOfCondition,
    todayAvg,
    todayHigh,
    todayLow,
    currentVisibility,
    todayClouds,
    currentRain,
    currentHumidity,
    currentWind,
    currentSevere,
    dayOfHoursData
  }
};

//Using Index for forecasted days
export const weatherDataFunctions = function (data, celsius, index) {
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

  function getDayOfDescription() {
    const description = data.days[index].description;
    return description;
  };

  function getVisibility() {
    const visible = data.currentConditions.visibility;
    return visible;
  }

  function getCloudCoverage() {
    const cloudy = data.currentConditions.cloudcover;
    return cloudy;
  }

  function getRainChance(getForecasted) {
    let rain = null;
    if (getForecasted) {
      rain = data.days[index].precipprob;
    } else {
      rain = data.currentConditions.precipprob;
      return rain;
    }
  }

  function getHumidity(getForecasted) {
    let humid = null;
    if (getForecasted) {
      humid = data.days[index].humidity;
    } else {
      humid = data.currentConditions.humidity;
      return humid;
    }
  }

  function getWind(getForecasted) {
    let wind = null;
    if (getForecasted) {
      wind = data.days[index].windspeed;
    } else {
      wind = data.currentConditions.windspeed;
      return wind;
    }
  }

  function getSeverity() {
    const severe = data.days[index].severerisk;
    return severe;
  }

  function getFeelsLike() {
    const feelsLike = data.currentConditions.feelslike;
    return feelsLike;
  }

  function getHoursData(indexforhour) {
    const hoursData = data.days[0].hours[indexforhour];
    return hoursData;
  }

  return {
    getCurrentCondition:getCurrentCondition,
    getAvg:getAvg,
    getHigh:getHigh,
    getLow:getLow,
    getDayOfDescription:getDayOfDescription,
    getVisibility:getVisibility,
    getCloudCoverage:getCloudCoverage,
    getRainChance:getRainChance,
    getHumidity:getHumidity,
    getWind:getWind,
    getSeverity:getSeverity,
    getFeelsLike:getFeelsLike,
    getHoursData:getHoursData,
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
};


