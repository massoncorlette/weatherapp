
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
}

