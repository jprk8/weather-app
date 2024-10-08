export { showWeather };
import { format } from 'date-fns';
import clearDayIcon from './icon/clear-day.svg';
import clearNightIcon from './icon/clear-night.svg';
import cloudyIcon from './icon/cloudy.svg';
import fogIcon from './icon/fog.svg';
import partlyCloudyDayIcon from './icon/partly-cloudy-day.svg';
import partylCloudyNightIcon from './icon/partly-cloudy-night.svg';
import rainIcon from './icon/rain.svg';
import snowIcon from './icon/snow.svg';
import windyIcon from './icon/windy.svg';

const weatherIcons = {
    clearDay: clearDayIcon,
    clearNight: clearNightIcon,
    cloudy: cloudyIcon,
    fog: fogIcon,
    partlyCloudyDay: partlyCloudyDayIcon,
    partlyCloudyNight: partylCloudyNightIcon,
    rain: rainIcon,
    snow: snowIcon,
    windy: windyIcon
}

const resolvedLocation = document.querySelector('.resolved-location');
const dateTime = document.querySelector('.date-time');
const description = document.querySelector('.description');
const currentIcon = document.querySelector('.weather-card > img');
const actualTemp = document.querySelector('.actual-temp');
const maxMin = document.querySelector('.max-min');
const feelslike = document.querySelector('.feelslike');
const condition = document.querySelector('.condition');
const conditions = document.querySelector('.conditions');
const precip = document.querySelector('.precip');
const humidity = document.querySelector('.humidity');
const uv = document.querySelector('.uv');

function showWeather(weather) {
    resolvedLocation.textContent = weather.location;
    dateTime.textContent = format(weather.forecast[0].datetime, 'PPPP');
    description.textContent = weather.description;
    currentIcon.src = weatherIcons[camelize(weather.icon)];
    currentIcon.style.display = 'block';
    actualTemp.textContent = `${Math.round(weather.temp)}℉`;
    maxMin.textContent = `H: ${Math.round(weather.forecast[0].max)}℉ / L: ${Math.round(weather.forecast[0].min)}℉`;
    feelslike.textContent = `Feels like ${Math.round(weather.feelslike)}℉`;
    condition.textContent = `Condition: ${weather.condition}`;
    conditions.style.cssText = 'padding: 10px 20px';
    precip.textContent = `Precipitation: ${weather.precip}%`;
    humidity.textContent = `Humidity: ${weather.humidity}%`;
    uv.textContent = `UV Index: ${weather.uv}.0`;
}

function showForecast(weather) {

}

function camelize(str) {
    return str
        .split('-')
        .map((word, index) => 
            index === 0 ? word : word[0].toUpperCase() + word.slice(1)
        )
        .join('');
}