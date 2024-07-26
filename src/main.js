
let location = null;

// entry function from index
export function initializeApp() {
  let submitBtn = document.querySelector('#submitbtn');
  
  submitBtn.addEventListener('click', () => {
    location = document.querySelector('#locationInput').value;
    queryForData(location);
  }); 
}

//dealing with Promise object
async function queryForData(selectedLocation) { 
  try {
    const weatherData = await retrieveWeatherData(selectedLocation);
    console.log(weatherData);
    displayWeatherData(weatherData);
  } catch(error) {
    console.log(error);
  }
};

// return Promise object
async function retrieveWeatherData(selectedLocation) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedLocation}/2024-7-27?key=F9HSLGSNS2LUJYXZA84KV9H2M`;
  
  const forum = document.querySelector('#weatherForum');
  forum.action = url;
  forum.setAttribute('method', 'GET');
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

// displaying data
function displayWeatherData(data) {
  const container = document.createElement('div');
  container.classList.add('weather-data-container');

  let tempElement = document.createElement('p');
  tempElement.innerHTML = `Temperature: ${data.days[0]} °F`;
  container.appendChild(tempElement);

  document.body.appendChild(container);
};