# weatherapp
Focusing on working with API's, asynchronous code, Promise objects

https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/


// MAIN functions
(import DOM functions)

function to retrieveWeatherData() from server 
  fetch (url)
    .then(displayData(data))

function to queryForData through an eventListener
  'click' => retrieveWeatherData(location)

function to displayWeatherData()

function to displayDayOfForecast()

function to displayDayOfDescription()

function to displaySevenDayForecast()

function to switchCelFar()


// DOM functions

function clearMain()



snow	Amount of snow is greater than zero
snow-showers-day	Periods of snow during the day
snow-showers-night	Periods of snow during the night
thunder-rain	Thunderstorms throughout the day or night
thunder-showers-day	Possible thunderstorms throughout the day
thunder-showers-night	Possible thunderstorms throughout the night
rain	Amount of rainfall is greater than zero
showers-day	Rain showers during the day
showers-night	Rain showers during the night
fog	Visibility is low (lower than one kilometer or mile)
wind	Wind speed is high (greater than 30 kph or mph)
cloudy	Cloud cover is greater than 90% cover
partly-cloudy-day	Cloud cover is greater than 20% cover during day time.
partly-cloudy-night	Cloud cover is greater than 20% cover during night time.
clear-day	Cloud cover is less than 20% cover during day time
clear-night	Cloud cover is less than 20% cover during night time



