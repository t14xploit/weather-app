import React from 'react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
  isCelsius: boolean;
  onToggleUnit: () => void;
  convertTemperature: (temp: number, toCelsius: boolean) => number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weatherData, 
  isCelsius, 
  onToggleUnit, 
  convertTemperature 
}) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
        <button
          className="unit-toggle"
          onClick={onToggleUnit}
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
  );
};

export default WeatherCard;
