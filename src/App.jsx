import React, { useState } from "react";
import axios from "axios";

function App() {
  // State variables to manage data, location input, and error messages
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  // OpenWeatherMap API key for making requests
  const apiKey = "78f6b87e87d905303d2a498fde1bc61f";

  // Function to handle location search when Enter key is pressed
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      // Constructing the API URL for the OpenWeatherMap request
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

      // Making the API request using Axios
      axios
        .get(apiUrl)
        .then((response) => {
          // Update state with weather data and reset error message
          setData(response.data);
          setError("");
        })
        .catch((error) => {
          // If there's an error, reset weather data and set an error message
          setData({});
          setError("Invalid location. Please enter a valid city.");
        });

      // Resetting the location input after the search
      setLocation("");
    }
  };

  // Conversion functions for temperature from Kelvin to Fahrenheit and Celsius
  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  // JSX for rendering the component
  return (
    <div className="app">
      {/* Search input section */}
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location..."
          type="text"
        />
      </div>

      {/* Main container for weather information */}
      <div className="container">
        {/* Top section with location name, temperature, and weather description */}
        <div className="top">
          <div className="location">
            <p className="locationname">{data.name}</p>
          </div>
          <div className="temp">
            {/* Display temperature in Celsius */}
            {data.main ? (
              <h1>{kelvinToCelsius(data.main.temp).toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {/* Display weather description */}
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* Bottom section with "Feels Like," Humidity, and Wind Speed */}
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {/* Display "Feels Like" temperature in Fahrenheit */}
              {data.main ? (
                <p className="bold">
                  {kelvinToFahrenheit(data.main.feels_like).toFixed()}°F
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {/* Display humidity percentage */}
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {/* Display wind speed in MPH */}
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}

        {/* Display error message if there's an issue with the location */}
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {/* Footer section with copyright information */}
        <footer>
          <h4 className="copyright">&copy; 2024 Vishnu Krishnakumar</h4>
        </footer>
      </div>
    </div>
  );
}

// Exporting the App component
export default App;
