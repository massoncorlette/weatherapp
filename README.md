# weatherapp
Focusing on working with API's, asynchronous code, Promise objects

https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/


// logic

intitilizeApp()
listening for submit button, to queryForData()

queryForData(location)
getting promise object from retrieveWeatherData(location)
dealing with Promise object, so I can then displayWeatherData()

retrieveWeatherData(location)
using try block to get JSON data from weather API

displayForecast(data, celsisus, index)
can return data stat for any given day using index

displayGif()
return GIF based upon condition key-value

// dom

displayWeatherData(data)
can use displayForecast() return data to display for DOM, 
can display for one day, 7 days (maybe two weeks)?
 







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


queryForData()
  displayWeatherData()

displayWeatherData(data, index)
  variables = displayDayOfForecast(data, index).method

  gif = displayGif()

  displaySevenDayForecast(data)

displaySevenDayForecast(data)
  for i=0 i<8 i++
    displayDayOfForecast(data, i)

displayDayOfForecast(data, cel, index)

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



