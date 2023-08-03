import React from 'react'
import {Images} from "../../utils/images";
import "./home.css";
import { useState } from 'react';
// import { useEffect } from 'react';
import axios from 'axios'; 

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: '/images/clear.png'
    })
    const[name, setName] = useState('');
    
    const handleClick = () =>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16f77592bffd38fa909aaaccc8e9e82d&&units=metric`;
        axios.get(apiUrl)
        .then(res => {
            let imagePath = '';
            if(res?.data?.weathe?.[0]?.main === 'clear') {
                imagePath = Images.Clear
            }else if(res?.data?.weather?.[0]?.main === 'Clouds'){
                imagePath = Images.Clouds
            }else if(res?.data?.weather?.[0]?.main === 'Rain'){
                imagePath = Images.Main
            }else if(res?.data?.weather?.[0]?.main === 'Drizzle'){
                imagePath = Images.Drizzle
            }else if(res?.data?.weather?.[0]?.main === 'Mist'){
                imagePath = Images.Mist
            }else{
                imagePath = Images.Clear
            }
            console.log(res.data);
            setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath})
        })
        .catch( err => console.log(err));
        }
    }

    console.log(data)
    return (
        <div className="container">
            <div className="weather-section">
                <div className="topnav">
                    <input type="text" placeholder="Enter City Name" onChange={e =>setName(e.target.value)}/>
                    <button onClick={handleClick}><img className="search-img ms-3"src={Images.Search} /></button>
                    
                </div>
                <img className="clear-sky-img"src={Images.ClearSky}/>
                <h2 className="clear-sky-heading">{Math.round(data.celcius)}<sup>o</sup>C<br/><small>{data.name}</small></h2>
                <div className="clear-sky-text">
                    <div className="humidity-section">
                      <img className="humidity-img"src={Images.Humidity}/>
                      <span>
                      <p>{Math.round(data.humidity)}%</p>
                      <p>Humidity</p>
                      </span>
                    </div>
                    <div className="windspeed-section">
                      <img className="windspeed-img"src={Images.WindSpeed}/>
                      <span>
                      <p>{Math.round(data.speed)} Km/H</p>
                      <p>Wind Speed</p>
                      </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
