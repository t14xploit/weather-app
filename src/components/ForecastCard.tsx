import React from 'react';
import type { ForecastData } from '../types/weather';
import { getWeatherEmoji } from '../utils/weatherUtils';

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
                <span className="forecast-emoji">
                  {getWeatherEmoji(day.weather[0].main, day.weather[0].description)}
                </span>
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
