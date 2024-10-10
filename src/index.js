import './style.css';
import { getWeather } from './weather.js';
import { showWeather, showForecast } from './display-controller.js';

const location = document.getElementById('location');
const submitBtn = document.querySelector('button');

let weatherData = null;
let fahrenheit = true;

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = getWeather(location.value);
    data.then((response) => {
        weatherData = response;
        showWeather(weatherData, fahrenheit);
        showForecast(weatherData, fahrenheit);
    })
    .catch((error) => {
        console.log(error);
    });
});

const toggleBtn = document.querySelector('.toggle');
toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const toggle = document.querySelector('.toggle');
    if (fahrenheit) {
        fahrenheit = false;
        toggle.textContent = 'Unit: ℃';
    } else {
        fahrenheit = true;
        toggle.textContent = 'Unit: ℉';
    }
    //(fahrenheit) ? fahrenheit = false : fahrenheit = true;
    if (weatherData) {
        showWeather(weatherData, fahrenheit);
        showForecast(weatherData, fahrenheit);
    }
});