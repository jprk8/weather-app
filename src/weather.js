// Fetch weather data
export { getWeather };

const apiKey = 'R7AFFHHQKGCWNZBKSJW2ZCZME';

async function getWeather(location) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    // grab the desired forecast array from the day array
    const forecast = data.days.map((day) => ({
      datetime: day.datetime,
      temp: day.temp,
      tempC: convertToCelsius(day.temp),
      max: day.tempmax,
      maxC: convertToCelsius(day.tempmax),
      min: day.tempmin,
      minC: convertToCelsius(day.tempmin),
      condition: day.conditions,
      precip: day.precip,
      humidity: day.humidity,
      icon: day.icon,
    }));
    const weather = {
      location: data.resolvedAddress,
      temp: data.currentConditions.temp,
      tempC: convertToCelsius(data.currentConditions.temp),
      feelslike: data.currentConditions.feelslike,
      feelslikeC: convertToCelsius(data.currentConditions.feelslike),
      condition: data.currentConditions.conditions,
      description: data.description,
      uv: data.currentConditions.uvindex,
      precip: data.currentConditions.precipprob,
      humidity: data.currentConditions.humidity,
      forecast: forecast,
      icon: data.currentConditions.icon,
    };
    console.log(data);
    console.log(weather);
    return weather;
  } catch (error) {
    console.log(error);
  }
}

function convertToCelsius(tempF) {
  const celsius = ((tempF - 32) * 5) / 9;
  return Math.round(celsius);
}
