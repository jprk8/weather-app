// Fetch weather data
export { getWeather };

const apiKey = 'R7AFFHHQKGCWNZBKSJW2ZCZME';

// data needed:
// resolvedAddress
// current temp
// max temp
// min temp
// current condition
// description
// precip
// humidity
// UV
// x7 days forecast

async function getWeather(location) {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        // grab the desired forecast array from the day array
        const forecast = data.days.map(day => ({
            datetime: day.datetime,
            temp: day.temp,
            max: day.tempmax,
            min: day.tempmin,
            condition: day.conditions,
            precip: day.precip,
            humidity: day.humidity,
            icon: day.icon,
        }));
        const weather = {
            location: data.resolvedAddress,
            temp: data.currentConditions.temp,
            condition: data.currentConditions.conditions,
            uv: data.currentConditions.uvindex,
            precip: data.currentConditions.precip,
            humidity: data.currentConditions.humidity,
            forecast: forecast,
            icon: data.currentConditions.icon
        };
        console.log(data);
        console.log(weather);
    } catch (error) {
        console.log(error);
    }
}