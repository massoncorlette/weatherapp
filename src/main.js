
export async function retrieveWeatherData(location) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/2024-7-19?key=F9HSLGSNS2LUJYXZA84KV9H2M`;

    const data = await fetch(url, { mode: 'cors' })
    const weatherData = await data.json();
    console.log(weatherData);
  } catch (error) {
    console.log('error');
  }
};


let submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', () => {
  let location = document.querySelector('#locationInput').value;
  retrieveWeatherData(location);
});

function displayWeatherData(data) {
  const container = document.createElement('div');
  container.classList.add('weather-data-container');

  let tempElement = document.createElement('p');
  tempElement.innerHTML = `Temperature: ${data.days[0]} °F`;
  container.appendChild(tempElement);

  document.body.appendChild(container);
};