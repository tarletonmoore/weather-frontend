import React, { useState } from 'react';
import axios from 'axios';


const WeatherApp = () => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_SOME_KEY}`
      );

      const data = response.data;
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('City not found. Please enter a valid city name.');
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const kelvinToFahrenheit = (kelvin) => {
    return (kelvin - 273.15) * 9 / 5 + 32;
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" placeholder="Enter city name" onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {kelvinToFahrenheit(weatherData.main.temp).toFixed(2)} °F</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WeatherApp;

