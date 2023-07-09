import './details.scss';

import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';

function Details({weatherData}) {
  return (
    <div className='details'>
      <div className="humidity">
        <WaterDropIcon/>
        <p>{weatherData.main.humidity}%</p>
        <p>Humidity</p>
      </div>
      <div className="windspeed">
        <AirIcon/>
        <p>{weatherData.wind.speed} m/s</p>
        <p>Wind Speed</p>
      </div>
    </div>
  )
}

export default Details
