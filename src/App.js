import './App.css';
import "./index"
import React , {Fragment, useState} from "react";
import axios from "axios";

function App() {

  const [data,setData] = useState({});
  const[location,setLocation] = useState("Kolkata");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=72f54aabb7ce52398e41ac8adf72a011`;

  const searchLocation = (event) => {
    if(event.key==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation("");
    }
  }

  return (
    <div className="app">
      <div className='search'>
      <h2 className='heading'>Weather App.</h2>
        <input 
        value={location}
        onChange={event=>setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text" />
      </div>

      

      <div className="container">
      {
        data.name &&    
        <Fragment>
        <div className='clock'>
        <h2>{data && new Date(data.dt*1000).toLocaleDateString("en-US")}</h2>
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h2>{data.main && data.main.temp} ℃</h2>
          </div>
          <div className="description">
            <p>{data.weather && data.weather[0].main}</p>
          </div>
        </div>
          <div className="bottom">
          <div className="feels">
            <p className='bold'>{data.main && data.main.feels_like} ℃</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className='bold'>{data.main && data.main.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className='bold'>{data.wind && data.wind.speed} m/s</p>
            <p>Wind Speed</p>
          </div>
          <div className='visibility'>
            <p className='bold'>{data && data.visibility} meter</p>
            <p>Visibility</p>
          </div>
          <div className="sunrise">
            <p className="bold">{data.sys && new Date(data.sys.sunrise*1000).toLocaleString().substring(10,22)}</p>
            <p>Sunrise</p>
          </div>
          <div className='sunset'>
            <p className='bold'>{data.sys && new Date(data.sys.sunset*1000).toLocaleString().substring(10,22)}</p>
            <p>Sunset</p>
          </div>
        </div>
      </Fragment>
      }
      </div>
      <div className='footer'>
      <span>Created By <a href="https://www.linkedin.com/in/abhishek0105/">Abhishek Singh</a> | <span>©</span> 2022 All rights reserved.</span>
      </div>
    </div>
  );
}

export default App;
