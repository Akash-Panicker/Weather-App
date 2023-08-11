import './App.css';
import apikey from './apikey';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Grid, Typography, Input, Button, LinearProgress } from '@mui/material';

function App() {
    const initialcity = '';
    const [city, setCity] = useState(initialcity);
    const [searched, setSearched] = useState(false);
    const [oldCity, setOldCity] = useState(city);
    const [loading, setLoading] = useState(false);
    const [temperature, setTemperature] = useState(0);
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [iconCode,seticonCode] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            const apiKey = apikey;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${oldCity}&appid=${apiKey}&units=metric`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            console.log('Fetched Data:', data);

            // Update other states and data

            setLoading(false);
            setTemperature(data.main.temp);
            setDescription(data.weather[0].description);
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed);
            seticonCode(data.weather[0].icon);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
        }
    }, [oldCity]);

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            await fetchData();
        };

        if (searched) {
            fetchDataAndUpdateState();
        }
    }, [searched, fetchData]);

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearch = () => {
        setOldCity(city);
        setSearched(true);
        setCity(oldCity);
    };

    return (
        <div className="outerbod" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: "hidden", }}>
            <Card>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <div className="search-container">
                            <Input
                                type="text"
                                className="search-bar"
                                placeholder="Search"

                                onChange={handleChange}
                            />
                            <Button className="searchicon" onClick={handleSearch}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 1024 1024"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>

                                </svg>
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        {loading ? (
                            <LinearProgress />
                        ) : searched ? (
                            <div className="weather-container" >
                                <div className="weather-info">
                                    <Typography variant="h4">Weather in {oldCity}</Typography>
                                    <br></br>
                                    <Typography variant="h4" className="temp">
                                        {temperature} °Celcius
                                    </Typography>
                                    <Typography variant="body1" className="description">
                                        Description: {description}
                                    </Typography>
                                    <Typography variant="body1" className="humidity">
                                        Humidity: {humidity}%
                                    </Typography>
                                    <Typography variant="body1" className="wind">
                                        Wind Speed: {windSpeed} knots/hour
                                    </Typography>
                                </div>
                                <div className="weather-icon">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${iconCode}.png`} 
                                        alt="Weather Icon"
                                    />
                                </div>
                            </div>
                        ) : (
                            <Typography variant="h4" style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>Enter a city to search for weather</Typography>
                        )}
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}

export default App;
