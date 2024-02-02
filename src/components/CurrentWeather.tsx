import React, { useState, useEffect } from "react";
import "./CurrentWeather.css";
import iconMappings from "../assets/weatherIcons";

import { getTimeZone, formatSunriseSunset } from "./utils";
import { FaLongArrowAltUp,FaLongArrowAltDown } from "react-icons/fa";
import {  WiStrongWind, WiHumidity } from "react-icons/wi";
// import windIcon from "../assets/icons/wind.png";
// import humidityIcon from "../assets/icons/humidity.png";



const CurrentWeather: React.FC = () => {
  const api_key = "8a4fb5fcac39b5861795fd2c6f4ce1cb";

  const [icon, setIcon] = useState(iconMappings["01d"]);
  const [unit, setUnit] = useState("metric");
  const [city, setCity] = useState("Montreal");
  const [country, setCountry] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windRate, setWindRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [description, SetDescription] = useState("");
 

  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [unit, city]);

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setHumidity(data.main.humidity + " %");
      setTemperature(
        Math.round(data.main.temp) + (unit === "metric" ? "°C" : "°F")
      );
      setWindRate(
        Math.round(data.wind.speed) + (unit === "metric" ? " m/s" : " mph")
      );

      setFeelsLike(
        Math.round(data.main.feels_like) + (unit === "metric" ? "°C" : "°F")
      );
      setHigh(
        Math.round(data.main.temp_max) + (unit === "metric" ? "°C" : "°F")
      );
      setLow(
        Math.round(data.main.temp_min) + (unit === "metric" ? "°C" : "°F")
      );
   
      // Get sunrise and sunset from api and transform them through utils.ts
      const { sunrise, sunset } = data.sys;
      const { formattedSunrise, formattedSunset } = formatSunriseSunset(
        sunrise * 1000,
        sunset * 1000, 
        getTimeZone(data.timezone)
      );
      setSunrise(formattedSunrise);
      setSunset(formattedSunset);

      
      SetDescription(data.weather[0].description);
      setIcon(iconMappings[data.weather[0].icon]);
      setCountry(data.sys.country);


    } catch (error) {
      console.error(error);
    }
  };


  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="container">
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" onChange={toggleUnit} />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">{unit === "metric" ? "°C" : "°F"}</span>
      </div>
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="weather-info">
        <div className="weather-left">
          <div className="weather-image">
            <img src={icon} alt="weather icon" />
          </div>
          <div className="weather-temp">{temperature}</div>
          <div className="weather-location">
            {city ? city[0].toUpperCase() + city.substring(1) : "Montreal"}, {country}
          </div>
          <div className="weather-description">{description}</div>
        </div>
        <div className="weather-right">
          <div className="weather-feels-like">Feels like: {feelsLike}</div>
          <div className="weather-high"><FaLongArrowAltUp /> {high}</div>
          <div className="weather-low"><FaLongArrowAltDown /> {low}</div>
          <div className="weather-humidity"><WiHumidity /> {humidity}</div>
          <div className="weather-wind"><WiStrongWind /> {windRate}</div>
          <div className="weather-sunrise">Sunrise: {sunrise}</div>
          <div className="weather-sunset">Sunset: {sunset}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;