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

export const convertTemperature = (temp: number, toCelsius: boolean): number => {
  if (toCelsius) {
    return temp - 273.15; // Kelvin to Celsius
  } else {
    return (temp - 273.15) * 9/5 + 32; // Kelvin to Fahrenheit
  }
};
