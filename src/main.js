
export function retrieveWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/2024-7-19?key=F9HSLGSNS2LUJYXZA84KV9H2M`;

  fetch(url, { mode: 'cors' })
    .then(response => response.json())
    .then(data => {
      console.log(data); 
    })
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