# weatherapp
Focusing on working with API's, asynchronous code, Promise objects

https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/


function to retrieveWeatherData() from server 
  fetch (url)
    .then(displayData(data))

function to queryForData through an eventListener
  'click' => retrieveWeatherData(location)

function to displayData