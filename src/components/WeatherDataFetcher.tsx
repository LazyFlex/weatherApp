// WeatherDataFetcher.tsx
import React, { useEffect } from "react";
import { formatSunriseSunset, getTimeZone } from "./utils";
import iconMappings from "../assets/weatherIcons";
import axios from "axios";

interface WeatherData {
  main: {
    humidity: number;
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  timezone: number;
}

interface WeatherDataFetcherProps {
  weatherData: {
    icon: string;
    unit: string;
    city: string;
    country: string;
    humidity: string;
    windRate: string;
    temperature: string;
    feelsLike: string;
    high: string;
    low: string;
    sunrise: string;
    sunset: string;
    description: string;
  };
  setWeatherData: React.Dispatch<
    React.SetStateAction<{
      icon: string;
      unit: string;
      city: string;
      country: string;
      humidity: string;
      windRate: string;
      temperature: string;
      feelsLike: string;
      high: string;
      low: string;
      sunrise: string;
      sunset: string;
      description: string;
    }>
  >;
}

const WeatherDataFetcher: React.FC<WeatherDataFetcherProps> = ({
  weatherData,
  setWeatherData,
}) => {
  const api_key = "8a4fb5fcac39b5861795fd2c6f4ce1cb";

  useEffect(() => {
    if (weatherData.city) {
      fetchData();
    }
  }, [weatherData.city, weatherData.unit]);

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.city}&units=${weatherData.unit}&appid=${api_key}`;

    try {
      const response = await axios.get<WeatherData>(url);
      const data: WeatherData = response.data;

      setWeatherData((prevState) => ({
        ...prevState,
        humidity: data.main.humidity + " %",
        temperature:
          Math.round(data.main.temp) +
          (weatherData.unit === "metric" ? "°C" : "°F"),
        windRate:
          Math.round(data.wind.speed) +
          (weatherData.unit === "metric" ? " m/s" : " mph"),
        feelsLike:
          Math.round(data.main.feels_like) +
          (weatherData.unit === "metric" ? "°C" : "°F"),
        high:
          Math.round(data.main.temp_max) +
          (weatherData.unit === "metric" ? "°C" : "°F"),
        low:
          Math.round(data.main.temp_min) +
          (weatherData.unit === "metric" ? "°C" : "°F"),
        sunrise: formatSunriseSunset(
          data.sys.sunrise * 1000,
          data.sys.sunset * 1000,
          getTimeZone(data.timezone)
        ).formattedSunrise,
        sunset: formatSunriseSunset(
          data.sys.sunrise * 1000,
          data.sys.sunset * 1000,
          getTimeZone(data.timezone)
        ).formattedSunset,
        description: data.weather[0].description,
        icon: iconMappings[data.weather[0].icon],
        country: data.sys.country,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return null; // Since this component doesn't render anything visible
};

export default WeatherDataFetcher;
