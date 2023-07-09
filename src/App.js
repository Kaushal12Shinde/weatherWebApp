import './App.css';
import Searchbar from './Component/searchBar/Searchbar';
import Weather from './Component/weather/Weather';
import Forecast from './Component/forecast/Forecast';
import { useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

return (
    <div className="App">
      <div className="container">
        <Searchbar setWeatherData={setWeatherData} setForecastData={setForecastData}/>
        {weatherData && <Weather weatherData={weatherData} />}  
        {forecastData && <Forecast weatherData={weatherData} forecastData={forecastData} />}
      </div>
      
    </div>
  );
}

export default App;