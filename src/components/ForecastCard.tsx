import React from 'react';
import type { ForecastData } from '../types/weather';

interface ForecastCardProps {
  forecastData: ForecastData;
  isCelsius: boolean;
  convertTemperature: (temp: number, toCelsius: boolean) => number;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ 
  forecastData, 
  isCelsius, 
  convertTemperature 
}) => {
  return (
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
  );
};

export default ForecastCard;
