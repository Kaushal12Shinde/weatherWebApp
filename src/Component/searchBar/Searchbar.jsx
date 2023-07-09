import './serachebar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useState,useEffect } from 'react';

export default function Searchbar({ setWeatherData , setForecastData}) {
  const [text,setText] = useState('');
  
  const APIkey = `564ce7dcbe4d5ccbf9f94c272d6fe05b`;

  const [SavedLocation, setSavedLocation] = useState([]);

  useEffect(() => {
    const savedLocationData = localStorage.getItem('savedLocationData');
    if (savedLocationData) {
      setSavedLocation(JSON.parse(savedLocationData));
    }
  }, []);


  const handleText = (e) =>{
    setText(e.target.value);
  }


  const handleSearch = (Location)=>{
    let cityname = Location;
    const apiUrlweather =`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=metric`;
    const apiUrlforecast =`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}&units=metric`;
    const fetchweatherData = async () => {
      try {
          const response = await fetch(apiUrlweather);
          const jsonData = await response.json();
          console.log(jsonData);
          if(jsonData.cod===200)
            setWeatherData(jsonData);
          else
            alert('Enter Valid Location')
      } 
      catch (error) {
          alert('Enter Valid Location');
      }
    };

    const fetchforecastData = async () => {
      try {
          const response = await fetch(apiUrlforecast);
          const jsonData = await response.json();
          console.log(jsonData);
          if(jsonData.cod==="200")
            setForecastData(jsonData);
      } 
      catch (error) {
        alert('Error');
      }
    };
    fetchweatherData();
    fetchforecastData();

  }


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e.target.value);
    }
  };


  const handleAddLocation = () => {

    if(text.length===0){
      alert('Enter the Location');
    }
    else if (SavedLocation.includes(text)) {
      alert('Location already added');
    } 
    else {
      const updatedSavedLocation = [...SavedLocation, text];
      setSavedLocation(updatedSavedLocation);
      localStorage.setItem('savedLocationData', JSON.stringify(updatedSavedLocation));
    }

  };


  const handleClear = () => {
    setSavedLocation([]);
    localStorage.removeItem('savedLocationData');
  };


  const handleDeleteLocation = (location) => {
    const updatedSavedLocation = SavedLocation.filter(
      (loc) => loc !== location
    );

    setSavedLocation(updatedSavedLocation);
    localStorage.setItem('savedLocationData', JSON.stringify(updatedSavedLocation));
  };


  const handleSavedText = (e) =>{
    setText(e.target.innerText);
    handleSearch(e.target.innerText);
  }
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleGetGeolocation = () => {
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          alert('Geolocation is not supported by your browser');;
        }
      );
      
      const apiUrlweather =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`;
      const apiUrlforecast =`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`;

      const fetchweatherData = async () => {
        try {
            const response = await fetch(apiUrlweather);
            const jsonData = await response.json();
            console.log(jsonData);
            if(jsonData.cod===200)
            {
              setWeatherData(jsonData);
              setText(jsonData.name);
            }
            else
              alert('Enter Valid Location')
        } 
        catch (error) {
            alert('Enter Valid Location');
        }
      };
      
      const fetchforecastData = async () => {
        try {
            const response = await fetch(apiUrlforecast);
            const jsonData = await response.json();
            console.log(jsonData);
            if(jsonData.cod==="200")
              setForecastData(jsonData);
        } 
        catch (error) {
          alert('Error');
        }
      };
      fetchweatherData();
      fetchforecastData();
    } 
    else {
      alert('Geolocation is not supported by your browser');
    }
  };
  
  return (
    <div className="searchbar">
      <div className="activity">
        <button onClick={handleAddLocation} className='addLoc btn' ><AddLocationAltIcon/></button>
        <p id="textToShow" className="hidden">Save</p>
        <input type="text" className='SearchName' onChange={handleText} onKeyDown={handleKeyPress} value={text} placeholder="Search" />
        <button onClick={()=>handleSearch(text)} className='searchLoc btn' ><SearchOutlinedIcon/></button>
        <button className='myLoc' onClick={handleGetGeolocation}><MyLocationIcon/></button>
      </div>
      
      <div className="addedLoc">
        <div className="locationContainer">
          {
            SavedLocation.map((Loc)=>{
              return(
                <div className="box" key={Loc}>
                    <p onClick={handleSavedText}className="cityName">{Loc}</p>
                    <button className="deleteButton btn"onClick={()=>handleDeleteLocation(Loc)}>&#10006;</button>
                </div>
              )
            })
          }
        </div>
      </div>
      
      {SavedLocation.length > 0 && (
        <div className="cont">
          <button onClick={handleClear} className='clearButton btn'><ClearAllIcon/></button>
          <p id="textToShow" className="hidden">ClearAll</p>
        </div>
      )}
    </div>
  )
}
