import './weather.scss';
import Lottie from 'lottie-react';
import CloudSvg from '../../Assets/cloud.json'
import ClearSvg from '../../Assets/clear.json'
import MistSvg from '../../Assets/mist.json'
import RainSvg from '../../Assets/rain.json'
import SnowSvg from '../../Assets/snow.json'
import ThunderSvg from '../../Assets/thunder.json'
import Details from '../details/Details'

function Weather({weatherData}) {

  const timestamp = weatherData.dt * 1000;
  const dateObj = new Date(timestamp);
  const time = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const date = dateObj.toLocaleDateString('en-US');
  const svgData = 
  {
    Rain: RainSvg,
    Clear: ClearSvg,
    Clouds: CloudSvg,
    Thunderstorm:ThunderSvg,
    Drizzle:RainSvg,
    Snow:SnowSvg,
    Mist:MistSvg,
    Fog:MistSvg,
    Haze:MistSvg,
  };

  const weatherCondition = weatherData.weather[0].main;
  const animationData = svgData[weatherCondition] || null;
  const defaultAnimationData = CloudSvg;

  return (
    <div className='weather'>
        <p className='condition'>{weatherData.weather[0].main}</p>
        <div className="main">
          { animationData ? 
            ( <Lottie className='animeBox' animationData={animationData} /> ) : 
            (<Lottie className='animeBox' animationData={defaultAnimationData} />)
          }
          <p className='temp'>{Math.floor(weatherData.main.temp)}<span>&#176;</span></p>
        </div>
        <div className='timesec'>
            <p className='date'>{day}, {date} </p>
            <p className='time'>{time}</p>
        </div>
        {weatherData && <Details weatherData={weatherData} />}
    </div>
  )
}

export default Weather

