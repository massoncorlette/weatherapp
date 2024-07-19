import './style.css';
import {retrieveWeatherData} from './main.js';

document.addEventListener("DOMContentLoaded", () => {
  const test = 'indiana';
  retrieveWeatherData(test);
});
