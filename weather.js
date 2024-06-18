import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const searchWeather = () => {
    axios.get(`http://localhost:5000/weather?city=${city}`)
      .then(response => {
        setWeatherData(response.data);
        setError('');
      })
      .catch(error => {
        setWeatherData(null);
        setError('City not found');
      });
  };

  return (
    <div>
      <section id="search">
        <input 
          type="text" 
          id="cityInput" 
          placeholder="Enter city name" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <button id="searchBtn" onClick={searchWeather}>Search</button>
      </section>

      <section id="weather">
        <h2>Weather Information</h2>
        {error && <p>{error}</p>}
        {weatherData && (
          <div id="weatherData">
            <h3>{weatherData.city}</h3>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Description: {weatherData.description}</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Weather;
