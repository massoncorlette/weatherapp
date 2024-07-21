
export async function retrieveWeatherData() {
  try {
    const data = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/indiana/2024-7-19?key=F9HSLGSNS2LUJYXZA84KV9H2M', { mode: 'cors' })
    const weatherData = await data.json();
    console.log(weatherData);
  } catch (error) {
    console.log('error');
  }
};

export function queryForData() {
  let submitBtn = document.querySelector('#submit');

  submitBtn.addEventListener('click', () => {
    let location = document.querySelector('#locationInput').value;
    retrieveWeatherData();
  });
};

function displayWeatherData(data) {
  const container = document.createElement('div');
  container.classList.add('weather-data-container');

  let tempElement = document.createElement('p');
  tempElement.innerHTML = `Temperature: ${data.days[0]} °F`;
  container.appendChild(tempElement);

  document.body.appendChild(container);
};