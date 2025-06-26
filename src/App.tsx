import { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { useWeatherApi } from './hooks/useWeatherApi';
import { getBackgroundImage, convertTemperature, determineTimeOfDay } from './utils/weatherUtils';

function App() {
  const [city, setCity] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  const { weatherData, forecastData, loading, locationLoading, error, fetchWeather, fetchWeatherByLocation } = useWeatherApi();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleToggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const backgroundImage = weatherData ? getBackgroundImage(weatherData.weather[0].main, weatherData) : '/sunny.jpg';

  // Determine if it's night for glassmorphism styling
  const isNight = weatherData ? determineTimeOfDay(weatherData) : false;

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
      <div className={`container ${weatherData ? (isNight ? 'night-mode' : 'day-mode') : ''}`}>
        <SearchForm
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          onLocationSearch={fetchWeatherByLocation}
          loading={loading}
          locationLoading={locationLoading}
        />

        {error && <div className="error">{error}</div>}

        {weatherData && (
          <div className={`main-content ${isNight ? 'night-mode' : 'day-mode'}`}>
            <WeatherCard
              weatherData={weatherData}
              isCelsius={isCelsius}
              onToggleUnit={handleToggleUnit}
              convertTemperature={convertTemperature}
            />

            {forecastData && (
              <ForecastCard
                forecastData={forecastData}
                isCelsius={isCelsius}
                convertTemperature={convertTemperature}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
