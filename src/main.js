export function test() {
  console.log('testconsole');

  fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2024-7-19?key=F9HSLGSNS2LUJYXZA84KV9H2M', {mode: 'cors'})
  .then(function(response) {
    console.log(response.json());
  })
};