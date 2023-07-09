import './forecast.scss';
import Lottie from 'lottie-react';
import CloudSvg from '../../Assets/cloud.json'
import ClearSvg from '../../Assets/clear.json'
import MistSvg from '../../Assets/mist.json'
import RainSvg from '../../Assets/rain.json'
import SnowSvg from '../../Assets/snow.json'
import ThunderSvg from '../../Assets/thunder.json'


function Forecast({weatherData,forecastData}) {
    
    const timestamp = weatherData.dt * 1000;
    const dateObj = new Date(timestamp);
    let nowDate = dateObj.toLocaleDateString('en-US');
    let currentDate = nowDate;
    let updatedList = [];
    forecastData.list.forEach((entry) => {
        const entryDate = new Date(entry.dt_txt).toLocaleDateString('en-US');
        if (entryDate === currentDate) {
            updatedList.push(entry);
            const nextDateObj = new Date(currentDate);
            nextDateObj.setDate(nextDateObj.getDate() + 1);
            currentDate = nextDateObj.toLocaleDateString('en-US');
        }
    });
    updatedList.pop();
    console.log(updatedList);
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
        <div className='forecast'>
            <div className='forecastinfo'>
                {updatedList&&updatedList.map((element) => {
                        const ts = element.dt * 1000;
                        const dateObj = new Date(ts);
                        const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
                        return (
                            <div className="model" key={element.dt}>
                                { animationData ? 
                                    ( <Lottie className='anime' animationData={animationData} /> ) : 
                                    (<Lottie className='anime' animationData={defaultAnimationData} />)
                                }
                                <p className="temp">
                                {Math.floor(element.main.temp)}
                                <span>&#176;</span>
                                </p>
                                <div className="condition">
                                <p className="cond">{element.weather[0].main}</p>
                                <p className="day">{day}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
        
    )
}

export default Forecast
