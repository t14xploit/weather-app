import { useState, useEffect } from 'react'
import './App.css'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  const API_KEY = import.meta.env.VITE_API; // Reading from .env file

  // Demo data for testing without API key
  const demoWeatherData: { [key: string]: WeatherData } = {
    'london': {
      name: 'London',
      main: { temp: 288.15, feels_like: 287.15, humidity: 65, pressure: 1013 },
      weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
      wind: { speed: 3.5 },
      sys: { country: 'GB' }
    },
    'new york': {
      name: 'New York',
      main: { temp: 295.15, feels_like: 294.15, humidity: 55, pressure: 1015 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 2.1 },
      sys: { country: 'US' }
    },
    'tokyo': {
      name: 'Tokyo',
      main: { temp: 278.15, feels_like: 276.15, humidity: 80, pressure: 1008 },
      weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
      wind: { speed: 4.2 },
      sys: { country: 'JP' }
    },
    'moscow': {
      name: 'Moscow',
      main: { temp: 268.15, feels_like: 265.15, humidity: 90, pressure: 1020 },
      weather: [{ main: 'Snow', description: 'light snow', icon: '13d' }],
      wind: { speed: 1.8 },
      sys: { country: 'RU' }
    }
  };

  const getBackgroundImage = (weatherMain: string) => {
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

  const convertTemperature = (temp: number, toCelsius: boolean) => {
    if (toCelsius) {
      return temp - 273.15; // Kelvin to Celsius
    } else {
      return (temp - 273.15) * 9/5 + 32; // Kelvin to Fahrenheit
    }
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Check if it's a demo city first
      const demoCity = demoWeatherData[cityName.toLowerCase()];
      if (demoCity) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWeatherData(demoCity);
        setLoading(false);
        return;
      }

      // Try real API if API key is provided
      if (API_KEY) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('City not found');
        }

        const data = await response.json();
        setWeatherData(data);
      } else {
        throw new Error('City not found. Try: London, New York, Tokyo, or Moscow for demo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const backgroundImage = weatherData ? getBackgroundImage(weatherData.weather[0].main) : '/sunny.jpg';

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <h1 className="title">Weather App</h1>

        <div className="demo-info">
          <p>Try demo cities: London, New York, Tokyo, Moscow</p>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {weatherData && (
          <div className="weather-card">
            <div className="weather-header">
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <button
                className="unit-toggle"
                onClick={() => setIsCelsius(!isCelsius)}
              >
                Switch to {isCelsius ? '°F' : '°C'}
              </button>
            </div>

            <div className="weather-main">
              <div className="temperature">
                {Math.round(convertTemperature(weatherData.main.temp, isCelsius))}°{isCelsius ? 'C' : 'F'}
              </div>
              <div className="weather-description">
                {weatherData.weather[0].description}
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span>Feels like</span>
                <span>{Math.round(convertTemperature(weatherData.main.feels_like, isCelsius))}°{isCelsius ? 'C' : 'F'}</span>
              </div>
              <div className="detail-item">
                <span>Humidity</span>
                <span>{weatherData.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span>Wind Speed</span>
                <span>{weatherData.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span>Pressure</span>
                <span>{weatherData.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
