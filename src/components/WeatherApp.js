import React, {useState } from 'react';
import './WeatherApp.css';


const WeatherApp = () => {
    let obj = {temp: 0, min: 0, max: 0};
    const [city, setCity] = useState(obj);
    const [search, setSearch] = useState("Please enter the city name");

    const fetchApi = async (city_name) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=a6454549915398c25d1e63ce329debc0`;
        const response = await fetch(url);
        const resJson = await response.json();
        //let main = JSON.parse(resJson);
        console.log(resJson['main']);
        let temp_num = ((resJson['main']['temp']-273.15)).toFixed(2);
        let temp_min_num = (resJson['main']['temp_min']-273.15).toFixed(2);
        let temp_max_num = (resJson['main']['temp_max']-273.15).toFixed(2);
        setCity({temp: temp_num, min:temp_min_num , max: temp_max_num, weather: resJson['weather']['0']['main']});  
    }

    const getWeather = () => {
    console.log("hiiiiiii", search);
    fetchApi(search);
    
}

    return (
        <>
        <div className="box">
            <div className="inputData">
                <input type="search" className="inputField" onChange={ (event) => {
                    setSearch(event.target.value)
                } }/> 
                <button className="submitBtn" onClick={getWeather}>Get Weather</button>
            </div>  

            <div className="info">
                <h2 className="location">
                    <p>{search}</p>
                </h2>
                <h1 className="temp">
                {city.temp}°Cel
                </h1>
                <h3 className="tempMinMax">Min : {city.min}°Cel | Max : {city.max}°Cel</h3>
                <h3>{city.weather}</h3>
            </div>  
               
        </div>
        </>
    );
} 

export default WeatherApp;