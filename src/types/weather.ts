export interface WeatherData {
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
    deg?: number;
  };
  sys: {
    country: string;
  };
  coord?: {
    lat: number;
    lon: number;
  };
  visibility?: number;
  uvi?: number;
  clouds?: {
    all: number;
  };
}

export interface ForecastDay {
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

export interface ForecastData {
  daily: ForecastDay[];
}
