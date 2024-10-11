export { showWeather, showForecast };
import { format } from 'date-fns';
import clearDayIcon from './icon/clear-day.svg';
import clearNightIcon from './icon/clear-night.svg';
import cloudyIcon from './icon/cloudy.svg';
import fogIcon from './icon/fog.svg';
import partlyCloudyDayIcon from './icon/partly-cloudy-day.svg';
import partlyCloudyNightIcon from './icon/partly-cloudy-night.svg';
import rainIcon from './icon/rain.svg';
import snowIcon from './icon/snow.svg';
import windyIcon from './icon/windy.svg';

const weatherIcons = {
    clearDay: clearDayIcon,
    clearNight: clearNightIcon,
    cloudy: cloudyIcon,
    fog: fogIcon,
    partlyCloudyDay: partlyCloudyDayIcon,
    partlyCloudyNight: partlyCloudyNightIcon,
    rain: rainIcon,
    snow: snowIcon,
    windy: windyIcon
}

const header = document.querySelector('.header');
const weatherContainer = document.querySelector('.weather-container');
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

function showWeather(weather, fahrenheit) {
    header.style.cssText = 'padding: 14px;';
    resolvedLocation.textContent = weather.location;
    const today = new Date(weather.forecast[0].datetime.replace('-', '/'));
    dateTime.textContent = format(today, 'PPPP');
    description.textContent = weather.description;
    weatherContainer.style.cssText = 'padding: 20px';
    currentIcon.src = weatherIcons[camelize(weather.icon)];
    currentIcon.style.display = 'block';

    if (weather.icon.includes('day')) {
        weatherContainer.style.backgroundColor = 'rgb(42, 146, 194)';
    } else if (weather.icon.includes('night')) {
        weatherContainer.style.backgroundColor = 'rgb(13, 28, 63)';
    } else {
        weatherContainer.style.backgroundColor = 'rgb(102, 107, 121)';
    }

    if (fahrenheit ) {
        actualTemp.textContent = `${Math.round(weather.temp)}℉`;
        feelslike.textContent = `Feels like ${Math.round(weather.feelslike)}℉`;
        maxMin.textContent = `H: ${Math.round(weather.forecast[0].max)}℉ / L: ${Math.round(weather.forecast[0].min)}℉`;
    } else {
        actualTemp.textContent = `${Math.round(weather.tempC)}℃`;
        feelslike.textContent = `Feels like ${Math.round(weather.feelslikeC)}℃`;
        maxMin.textContent = `H: ${Math.round(weather.forecast[0].maxC)}℃ / L: ${Math.round(weather.forecast[0].minC)}℃`;
    }

    condition.textContent = `Condition: ${weather.condition}`;
    conditions.style.cssText = 'padding: 10px 20px';
    precip.textContent = `Precipitation: ${weather.precip}%`;
    humidity.textContent = `Humidity: ${weather.humidity}%`;
    uv.textContent = `UV Index: ${weather.uv}.0`;
}

const forecast = document.querySelector('.forecast');

function showForecast(weather, fahrenheit) {
    const removeForecast = document.querySelectorAll('.forecast > *');
    removeForecast.forEach((item) => {
        forecast.removeChild(item);
    });
    const title = document.createElement('div');
    title.className = 'forecast-title';
    title.textContent = '7-day Forecast';
    forecast.appendChild(title);
    forecast.style.display = 'block';
    for (let i = 1; i < 8; i++) {
        const row = document.createElement('div');
        const date = document.createElement('div');
        const icon = document.createElement('img');
        const condition = document.createElement('div');
        const temp = document.createElement('div');
        row.className = 'forecast-row';
        date.className = 'forecast-date';
        condition.className = 'forecast-condition';
        temp.className = 'forecast-temp';
        const shortDate = new Date(weather.forecast[i].datetime.replace('-', '/'));
        date.textContent = format(shortDate, 'MM/dd EEE');
        icon.src = weatherIcons[camelize(weather.forecast[i].icon)];
        condition.textContent = weather.forecast[i].condition;
        if (fahrenheit) {
            const max = Math.round(weather.forecast[i].max);
            const min = Math.round(weather.forecast[i].min);
            temp.textContent = `H: ${max}℉ / L: ${min}℉`;
        } else {
            const max = Math.round(weather.forecast[i].maxC);
            const min = Math.round(weather.forecast[i].minC);
            temp.textContent = `H: ${max}℃ / L: ${min}℃`;
        }

        row.appendChild(date);
        row.appendChild(icon);
        row.appendChild(condition);
        row.appendChild(temp);
        forecast.appendChild(row);
    }
}

function camelize(str) {
    return str
        .split('-')
        .map((word, index) => 
            index === 0 ? word : word[0].toUpperCase() + word.slice(1)
        )
        .join('');
}