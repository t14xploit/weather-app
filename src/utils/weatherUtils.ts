export const getBackgroundImage = (weatherMain: string): string => {
  switch (weatherMain.toLowerCase()) {
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
