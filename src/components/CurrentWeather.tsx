import React, { useState, useEffect } from "react";
import "./CurrentWeather.css";
import iconMappings from "../assets/weatherIcons";

import { FaLongArrowAltUp,FaLongArrowAltDown } from "react-icons/fa";
import {  WiStrongWind, WiHumidity } from "react-icons/wi";
// import windIcon from "../assets/icons/wind.png";
// import humidityIcon from "../assets/icons/humidity.png";

// Function to get time zone based on offset
function getTimeZone(offsetSeconds) {
  const offsetHours = offsetSeconds / 3600; // Convert seconds to hours
  const timeZone = `Etc/GMT${offsetHours >= 0 ? "-" : "+"}${Math.abs(
    offsetHours
  )}`;
  return timeZone;
}

const CurrentWeather: React.FC = () => {
  const api_key = "8a4fb5fcac39b5861795fd2c6f4ce1cb";

  const [icon, setIcon] = useState(iconMappings["01d"]);
  const [unit, setUnit] = useState("metric");
  const [city, setCity] = useState("Montreal");
  const [country, setCountry] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windRate, setWindRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [feelsLike, setFeelsLike] = useState<string>("");
  const [high, setHigh] = useState<string>("");
  const [low, setLow] = useState<string>("");
  const [sunrise, setSunrise] = useState<string>("");
  const [sunset, setSunset] = useState<string>("");
  const [timezoneOffsetSeconds, setTimezoneOffsetSeconds] = useState(0);
  const [description, Setdescription] = useState("");

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
      // Set timezone offset and sunrise/sunset times
      const sunriseMilliseconds =
        (data.sys.sunrise + timezoneOffsetSeconds) * 1000;
      const sunsetMilliseconds =
        (data.sys.sunset + timezoneOffsetSeconds) * 1000;

      const sunriseDate = new Date(sunriseMilliseconds);
      const sunsetDate = new Date(sunsetMilliseconds);

      const formattedSunrise = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: getTimeZone(data.timezone), // Dynamic time zone based on city
      }).format(sunriseDate);

      const formattedSunset = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: getTimeZone(data.timezone), // Dynamic time zone based on city
      }).format(sunsetDate);

      setSunrise(formattedSunrise);
      setSunset(formattedSunset);

      Setdescription(data.weather[0].description);

      const weatherIcon = iconMappings[data.weather[0].icon];
      setIcon(weatherIcon);
      setCountry(data.sys.country);
    } catch (error) {
      console.error(error);
    }
  };

  const search = () => {
    const element = document.getElementsByClassName(
      "cityInput"
    ) as HTMLCollectionOf<HTMLInputElement>;
    if (element[0].value === "") {
      return 0;
    }
    setCity(element[0].value);
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
            {city[0].toUpperCase() + city.substring(1)}, {country}
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
