import './style.css';
import { getWeather } from './weather.js';

const location = document.getElementById('location');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(location.value);
});