import { format } from "date-fns";

//Focus on DOM elements and UI last!
//Convert all temps to celsius or a second API request? 

let location = null;
let forecastTemps = [];

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

const displayDayOfForecast = function (data) {
  function getAvg() {
    const temp = data.days[0].temp;
    return temp;
  }

  function getHigh() {
    const high = data.days[0].tempmax;
    return high;
  }

  function getLow() {
    const low = data.days[0].tempmin;
    return low;
  }

  function displayDayOfDescription() {
    const description = data.days[0].description;
    return description;
  };

  return {
    getAvg:getAvg,
    getHigh:getHigh,
    getLow:getLow,
    displayDayOfDescription:displayDayOfDescription,
  }
};

// displaying data
function displayWeatherData(data) {
  
  const description = displayDayOfForecast(data).displayDayOfDescription();
  const todayTemp = displayDayOfForecast(data).getAvg();
  const todayHigh = displayDayOfForecast(data).getHigh();
  const todayLow = displayDayOfForecast(data).getLow();
  
  console.log(todayTemp);
  console.log(todayHigh);
  console.log(todayLow);
  console.log(description);
  console.log(displaySevenDayForecast(data));
};


function displaySevenDayForecast(data) {
  for (let i = 0; i < data.days.length; i++) {
    console.log(data.days[i])
  }
};

function switchCelFar(data) {

};