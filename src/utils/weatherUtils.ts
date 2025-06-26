export const getBackgroundImage = (weatherMain: string, weatherData?: any): string => {
  const isNight = determineTimeOfDay(weatherData);
  const weather = weatherMain.toLowerCase();

  if (isNight) {
    // Night time backgrounds
    switch (weather) {
      case 'clear':
        return '/clear-sky-night.jpg';
      case 'rain':
      case 'drizzle':
        return '/night-rain.jpg';
      case 'snow':
        return '/night-snow.jpg';
      case 'clouds':
        return '/cloudy-night.jpg';
      default:
        return '/clear-sky-night.jpg';
    }
  } else {
    // Day time backgrounds
    switch (weather) {
      case 'clear':
        return '/sunny.jpg';
      case 'rain':
      case 'drizzle':
        return '/rain.jpg';
      case 'snow':
        return '/snow.jpg';
      case 'clouds':
        return '/cloudy.jpg';
      default:
        return '/sunny.jpg';
    }
  }
};

const determineTimeOfDay = (weatherData?: any): boolean => {
  if (!weatherData) {
    // Fallback to local time if no weather data
    const currentHour = new Date().getHours();
    return currentHour < 6 || currentHour >= 18; // Night between 6 PM and 6 AM
  }

  // Use sunrise/sunset data from API if available
  if (weatherData.sys && weatherData.sys.sunrise && weatherData.sys.sunset) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;

    return currentTime < sunrise || currentTime > sunset;
  }

  // Use timezone offset if available
  if (weatherData.timezone) {
    const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime + (weatherData.timezone * 1000));
    const localHour = localTime.getHours();

    return localHour < 6 || localHour >= 18;
  }

  // Final fallback to local time
  const currentHour = new Date().getHours();
  return currentHour < 6 || currentHour >= 18;
};

export const getWeatherEmoji = (weatherMain: string, description: string): string => {
  const main = weatherMain.toLowerCase();
  const desc = description.toLowerCase();

  switch (main) {
    case 'clear':
      return '☀️';
    case 'clouds':
      if (desc.includes('few')) return '🌤️';
      if (desc.includes('scattered')) return '⛅';
      if (desc.includes('broken') || desc.includes('overcast')) return '☁️';
      return '☁️';
    case 'rain':
      if (desc.includes('light')) return '🌦️';
      if (desc.includes('heavy') || desc.includes('extreme')) return '⛈️';
      return '🌧️';
    case 'drizzle':
      return '🌦️';
    case 'thunderstorm':
      return '⛈️';
    case 'snow':
      if (desc.includes('light')) return '🌨️';
      return '❄️';
    case 'mist':
    case 'fog':
    case 'haze':
      return '🌫️';
    case 'dust':
    case 'sand':
      return '🌪️';
    case 'tornado':
      return '🌪️';
    default:
      return '🌤️';
  }
};

export const convertTemperature = (temp: number, toCelsius: boolean): number => {
  if (toCelsius) {
    return temp - 273.15; // Kelvin to Celsius
  } else {
    return (temp - 273.15) * 9/5 + 32; // Kelvin to Fahrenheit
  }
};
