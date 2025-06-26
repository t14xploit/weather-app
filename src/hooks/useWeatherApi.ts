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
      const processedDates = new Set();

      for (const item of data.list) {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();

        if (!processedDates.has(dateKey) && dailyForecasts.length < 7) {
          processedDates.add(dateKey);
          dailyForecasts.push({
            dt: item.dt,
            temp: {
              day: item.main.temp,
              night: item.main.temp,
              min: item.main.temp_min,
              max: item.main.temp_max
            },
            weather: item.weather,
            humidity: item.main.humidity,
            wind_speed: item.wind.speed
          });
        }
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
