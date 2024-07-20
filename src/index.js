import './style.css';
import { queryForData, retrieveWeatherData} from './main.js';

document.addEventListener("DOMContentLoaded", () => {
  retrieveWeatherData();
});
