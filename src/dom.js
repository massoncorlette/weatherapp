import { displayForecast, displayGif, queryForData } from "./logic";

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

// displaying data
// DOM function
export function displayWeatherData(data) {

  let celsius = false;
  
  const description = displayForecast(data).displayDayOfDescription();
  const currentCondtion = displayForecast(data).getCurrentCondition();
  const todayTemp = displayForecast(data, celsius).getAvg();
  const todayHigh = displayForecast(data).getHigh();
  const todayLow = displayForecast(data).getLow();
  const todayVisible = displayForecast(data).getVisibility();
  const todayClouds = displayForecast(data).getCloudCoverage();
  
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





