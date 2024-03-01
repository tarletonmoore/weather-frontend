import React, { useState } from 'react';
import axios from 'axios';
import rain from './assets/rain.jpg'
import sunny from './assets/sunny.jpeg'
import cloudy from './assets/cloudy.png'

const WeatherApp = () => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [weatherImage, setWeatherImage] = useState(null)

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_SOME_KEY}`
      );

      const data = response.data;
      setWeatherData(data);
      console.log(weatherData)
      if (data.weather[0].main === "Mist" || data.weather[0].main === "Drizzle") {
        setWeatherImage(rain);
        console.log(weatherImage)
      }
      else if (data.weather[0].main === "Clear") {
        setWeatherImage(sunny)
        console.log(weatherImage)
      }
      else if (data.weather[0].main === "Clouds") {
        setWeatherImage(cloudy)
      }
      else {
        // Handle other conditions if needed
        setWeatherImage(null); // Set a default image or null if not matching any condition
      }
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

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15
  }



  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" placeholder="Enter city name" onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {kelvinToFahrenheit(weatherData.main.temp).toFixed(2)} °F {kelvinToCelsius(weatherData.main.temp).toFixed(2)} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Min Temperature: {kelvinToFahrenheit(weatherData.main.temp_min).toFixed(2)} °F {kelvinToCelsius(weatherData.main.temp_min).toFixed(2)} °C</p>
          <p>Max Temperature: {kelvinToFahrenheit(weatherData.main.temp_max).toFixed(2)} °F {kelvinToCelsius(weatherData.main.temp_max).toFixed(2)} °C</p>
          {weatherImage && <img src={weatherImage} alt="Weather Condition" width="200px" />}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WeatherApp;

