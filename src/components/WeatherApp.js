import React, { useState } from "react";
import "./WeatherApp.css";
import {TextField} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const WeatherApp = () => {
  let obj = { temp: 0, feelsLike: 0, lon: 0, lat: 0 };
  const [city, setCity] = useState(obj);
  const [search, setSearch] = useState("Please enter the city name");
  const [isSelected, setIsSelected] = useState(false);
  const [forecast, setForecast] = useState([]);
  const fetchApi = async (city_name) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=a6454549915398c25d1e63ce329debc0`;
    const response = await fetch(url);
    const resJson = await response.json();
    //let main = JSON.parse(resJson);
    console.log(resJson["main"]);
    let temp_num = (resJson["main"]["temp"] - 273.15).toFixed(0);
    let feels_like = (resJson["main"]["feels_like"] - 273.15).toFixed(0);
    let longitude = resJson["coord"]["lon"];
    let lattitude = resJson["coord"]["lat"];
    setCity({
      temp: temp_num,
      feelsLike: feels_like,
      lon: longitude,
      lat: lattitude,
      weather: resJson["weather"]["0"]["main"],
    });
  };

  const getForecast = async () => {
          const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=a6454549915398c25d1e63ce329debc0`;
          const response = await fetch(url);
          const resJson = await response.json();
          let obj = [];
          let list = resJson["list"];
          let a = 0;
          for(let i=0;i < 40;i++)
          {
              if(i%8 === 0)
              {
                var myDate = new Date(list[i]["dt"]*1000);

                obj.push({key: a, dt: myDate, 
                temp: (list[i]["main"]["temp"]-273.15).toFixed(0), 
                feelsLike: (list[i]["main"]["feels_like"]-273.15).toFixed(0)})
                a = a+1;
              }   
          }
          setForecast(obj);
          console.log(forecast);
          
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

  const card = (
  forecast.map(artist => (
    <div key={artist.key}>
        <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {weekdays[(artist.dt).getDay()]}, {(artist.dt).getDate()} {monthNames[(artist.dt.getMonth())]}
      </Typography>
      
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
       Temperature : {artist.temp}
      </Typography>
      
    </CardContent>
    
  </React.Fragment>
    </div>
  )))

  const renderForecast = () => {
    return (
      <Box sx={{ minWidth: 150 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }

  const getWeather = () => {
    console.log("hiiiiiii", search);
    fetchApi(search);
    setIsSelected(true);
  };

  return (
    <>
      <div className="box">
      
        <div className="inputData">
        <TextField
                fullWidth
                id="standard-bare"
                variant="outlined"
                placeholder="Enter the location"
                
               required/>
          <Button variant="contained" onClick={getWeather} style={{marginTop:10}}>
            Get Weather
          </Button>
          
        </div>

        {isSelected && <div className="info">
          <h1 className="temp">{city.temp}°C</h1>
          <h2>Feels Like : {city.feelsLike}°C</h2>
          <h3>{city.weather}</h3>
          <Button variant="contained" onClick={getForecast} style={{marginTop:10}}>Get Forecast</Button><br /><br />
          This week's Forecast
          {renderForecast()}
        </div>  }
        
      </div>
    </>
  );
};

export default WeatherApp;
