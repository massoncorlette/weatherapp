# weatherapp
Focusing on working with API's, asynchronous code, Promise objects

The liveview container switches picture/GIF based upon the current weather condtions. All JSON data from visual crossing.

https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/

Animated SVG Weather Icons
The works contained in this archive were created by amCharts (https://www.amcharts.com/)
and is licensed under Creative Commons Attribution 4.0 International Public License:

https://creativecommons.org/licenses/by/4.0/

Toggle Switch Template
https://stackoverflow.com/questions/39846282/how-to-add-the-text-on-and-off-to-toggle-button


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

storeSevenDayForecast
  stores and returns 7 day data

storeDayOfForecast
  stores and returns day of data

// dom

displayWeatherData(data)
  displayDayOf(data)
    make DOM elements for Day Of
  displaySevenDay(data) 
    make Dom elements for 7-day forecast

  dayOf = storeDayOfForecast(data)
  sevenDay = storeSevenDayForecast(data)
  
  displayDayOf(dayOf)
  displaySevenDay(sevenDay)

displayGif()
return GIF based upon condition key-value

Layout: Header has logo - search option - C/F switch
Section 1 has location - current Temp - H/L - conditon
Section 2 has further details for current day
Section 3 has forecast for day
Section 4 has 7 day forecast

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



