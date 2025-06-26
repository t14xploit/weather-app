import { useState } from 'react'
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
  coord?: {
    lat: number;
    lon: number;
  };
}

interface ForecastDay {
  dt: number;
  temp: {
    day: number;
    night: number;
    min: number;
    max: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  humidity: number;
  wind_speed: number;
}

interface ForecastData {
  daily: ForecastDay[];
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
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
      sys: { country: 'GB' },
      coord: { lat: 51.5074, lon: -0.1278 }
    },
    'new york': {
      name: 'New York',
      main: { temp: 295.15, feels_like: 294.15, humidity: 55, pressure: 1015 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 2.1 },
      sys: { country: 'US' },
      coord: { lat: 40.7128, lon: -74.0060 }
    },
    'tokyo': {
      name: 'Tokyo',
      main: { temp: 278.15, feels_like: 276.15, humidity: 80, pressure: 1008 },
      weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
      wind: { speed: 4.2 },
      sys: { country: 'JP' },
      coord: { lat: 35.6762, lon: 139.6503 }
    },
    'moscow': {
      name: 'Moscow',
      main: { temp: 268.15, feels_like: 265.15, humidity: 90, pressure: 1020 },
      weather: [{ main: 'Snow', description: 'light snow', icon: '13d' }],
      wind: { speed: 1.8 },
      sys: { country: 'RU' },
      coord: { lat: 55.7558, lon: 37.6176 }
    }
  };

  const demoForecastData: ForecastData = {
    daily: [
      {
        dt: Date.now() / 1000,
        temp: { day: 288.15, night: 283.15, min: 283.15, max: 291.15 },
        weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
        humidity: 65,
        wind_speed: 3.5
      },
      {
        dt: Date.now() / 1000 + 86400,
        temp: { day: 290.15, night: 285.15, min: 285.15, max: 293.15 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        humidity: 55,
        wind_speed: 2.8
      },
      {
        dt: Date.now() / 1000 + 172800,
        temp: { day: 286.15, night: 281.15, min: 281.15, max: 289.15 },
        weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
        humidity: 75,
        wind_speed: 4.2
      },
      {
        dt: Date.now() / 1000 + 259200,
        temp: { day: 292.15, night: 287.15, min: 287.15, max: 295.15 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        humidity: 50,
        wind_speed: 2.1
      },
      {
        dt: Date.now() / 1000 + 345600,
        temp: { day: 289.15, night: 284.15, min: 284.15, max: 292.15 },
        weather: [{ main: 'Clouds', description: 'partly cloudy', icon: '02d' }],
        humidity: 60,
        wind_speed: 3.0
      },
      {
        dt: Date.now() / 1000 + 432000,
        temp: { day: 285.15, night: 280.15, min: 280.15, max: 288.15 },
        weather: [{ main: 'Rain', description: 'moderate rain', icon: '10d' }],
        humidity: 80,
        wind_speed: 4.5
      },
      {
        dt: Date.now() / 1000 + 518400,
        temp: { day: 291.15, night: 286.15, min: 286.15, max: 294.15 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        humidity: 45,
        wind_speed: 2.5
      }
    ]
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

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const data = await response.json();
      setForecastData(data);
    } catch (err) {
      console.error('Forecast fetch error:', err);
      // Use demo forecast data as fallback
      setForecastData(demoForecastData);
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
        setForecastData(demoForecastData);
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

        // Fetch forecast data if coordinates are available
        if (data.coord) {
          await fetchForecast(data.coord.lat, data.coord.lon);
        }
      } else {
        throw new Error('City not found. Try: London, New York, Tokyo, or Moscow for demo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
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
          <div className="main-content">
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

              <hr className="weather-separator" />

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

            {forecastData && (
              <div className="forecast-card">
                <h3 className="forecast-title">7-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecastData.daily.slice(0, 7).map((day, index) => {
                    const date = new Date(day.dt * 1000);
                    const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });

                    return (
                      <div key={day.dt} className="forecast-item">
                        <div className="forecast-day">{dayName}</div>
                        <div className="forecast-icon">
                          <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                            className="weather-icon"
                          />
                        </div>
                        <div className="forecast-temps">
                          <span className="temp-high">
                            {Math.round(convertTemperature(day.temp.max, isCelsius))}°
                          </span>
                          <span className="temp-low">
                            {Math.round(convertTemperature(day.temp.min, isCelsius))}°
                          </span>
                        </div>
                        <div className="forecast-desc">
                          {day.weather[0].description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
