
export function retrieveWeatherData(option) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${option}/2024-7-19?key=F9HSLGSNS2LUJYXZA84KV9H2M`;

  fetch(url, { mode: 'cors' })
  .then(function(response) {
    return response.json(); })

  .then(data => displayWeatherData(data))
  .catch(error => {
    console.error('Error:', error);
  });  
};

export function queryForData() {
  let submitBtn = document.querySelector('#submit');
  
  submitBtn.addEventListener('click', () => {
    let location = document.querySelector('#locationInput').value;
    retrieveWeatherData(location);
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







