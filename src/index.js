import './style.css';
import { getWeather } from './weather.js';
import { showWeather } from './display-controller.js';

const location = document.getElementById('location');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = getWeather(location.value);
    data.then((response) => {
        showWeather(response);
        //console.log(response);
    })
    .catch((error) => {
        //console.log(error);
    });
});