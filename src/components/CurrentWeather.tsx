// CurrentWeather.tsx
import React, { useState } from "react";
import "./CurrentWeather.css";
import WeatherDataFetcher from "./WeatherDataFetcher";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { WiStrongWind, WiHumidity } from "react-icons/wi";

const CurrentWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState({
    icon: "01d",
    unit: "metric",
    city: "Montreal",
    country: "",
    humidity: "",
    windRate: "",
    temperature: "",
    feelsLike: "",
    high: "",
    low: "",
    sunrise: "",
    sunset: "",
    description: ""
  });

  const toggleUnit = () => {
    setWeatherData({ ...weatherData, unit: weatherData.unit === "metric" ? "imperial" : "metric" });
  };

  return (
    <div className="container">
      <WeatherDataFetcher weatherData={weatherData} setWeatherData={setWeatherData} />
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">{weatherData.unit === "metric" ? "°C" : "°F"}</span>
      </div>
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search for a city"
          value={weatherData.city}
          onChange={(e) => setWeatherData({ ...weatherData, city: e.target.value })}
        />
      </div>
      <div className="weather-info">
        <div className="weather-left">
          <div className="weather-image">
            <img src={weatherData.icon} alt="weather icon" />
          </div>
          <div className="weather-temp">{weatherData.temperature}</div>
          <div className="weather-location">
            {weatherData.city ? weatherData.city[0].toUpperCase() + weatherData.city.substring(1) : "Montreal"}, {weatherData.country}
          </div>
          <div className="weather-description">{weatherData.description}</div>
        </div>
        <div className="weather-right">
          <div className="weather-feels-like">Feels like: {weatherData.feelsLike}</div>
          <div className="weather-high"><FaLongArrowAltUp /> {weatherData.high}</div>
          <div className="weather-low"><FaLongArrowAltDown /> {weatherData.low}</div>
          <div className="weather-humidity"><WiHumidity /> {weatherData.humidity}</div>
          <div className="weather-wind"><WiStrongWind /> {weatherData.windRate}</div>
          <div className="weather-sunrise">Sunrise: {weatherData.sunrise}</div>
          <div className="weather-sunset">Sunset: {weatherData.sunset}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
