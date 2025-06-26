import { useState } from 'react';
import type { WeatherData, ForecastData } from '../types/weather';

export const useWeatherApi = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_API;

  const fetchForecast = async (cityName: string) => {
    try {
      console.log('Fetching forecast for:', cityName);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const data = await response.json();
      console.log('Forecast data received:', data);

      // Transform 5-day forecast data to match our interface
      const dailyForecasts = [];
      const dailyData = new Map();

      // Group forecasts by date and collect all temperatures for each day
      for (const item of data.list) {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();

        if (!dailyData.has(dateKey)) {
          dailyData.set(dateKey, {
            dt: item.dt,
            temps: [],
            weather: item.weather,
            humidity: item.main.humidity,
            wind_speed: item.wind.speed,
            dateKey
          });
        }

        dailyData.get(dateKey).temps.push({
          temp: item.main.temp,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max
        });
      }

      // Calculate actual min/max for each day and create forecast objects
      for (const [dateKey, dayData] of dailyData) {
        if (dailyForecasts.length >= 7) break;

        const allTemps = dayData.temps.flatMap(t => [t.temp, t.temp_min, t.temp_max]);
        const minTemp = Math.min(...allTemps);
        const maxTemp = Math.max(...allTemps);
        const avgTemp = allTemps.reduce((sum, temp) => sum + temp, 0) / allTemps.length;

        dailyForecasts.push({
          dt: dayData.dt,
          temp: {
            day: avgTemp,
            night: minTemp,
            min: minTemp,
            max: maxTemp
          },
          weather: dayData.weather,
          humidity: dayData.humidity,
          wind_speed: dayData.wind_speed
        });
      }

      setForecastData({ daily: dailyForecasts });
      console.log('Processed forecast data:', { daily: dailyForecasts });
    } catch (err) {
      console.error('Forecast fetch error:', err);
      setForecastData(null);
    }
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError('');

    try {
      if (!API_KEY) {
        throw new Error('API key not found. Please add your OpenWeatherMap API key to .env file');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);

      // Fetch forecast data
      await fetchForecast(cityName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather
  };
};
