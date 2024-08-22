import React, { useState } from 'react';
import axios from 'axios'; 
import AreaContent from './areaContent';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ScrollToTopButton from '../../components/scrollToTopButton';

const containerStyle = {
  width: '70%',
  height: '400px',
};

const center = {
  lat: 36.5, 
  lng: 127.5, 
};

const AreaWeather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const [markerPosition, setMarkerPosition] = useState(center);
    const [showForecast, setShowForecast] = useState(false); 
    const [buttonText, setButtonText] = useState("날씨 더보기"); 
    

    const API_KEY = '8e2bda2ffa839bf4858a1241f1871b2e';
    const GOOGLE_MAPS_API_KEY = 'AIzaSyAIS7GwMlC34UkknuS_MhAs9s1Cxx44kTA'; 

    const fetchWeatherByCoordinates = (lat, lon) => {
        setError(null);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
            .then(resp => {
                setWeatherData(resp.data);
                if(showForecast){
                    fetchForecast(lat,lon);
                }
            })
            .catch(err => {
                setError('날씨 정보를 가져오는데 실패했습니다');
                setWeatherData(null);
            });
    };

    const fetchWeatherByLocation = () => {
        setError(null);
        setForecastData(null); // 새로운 위치를 검색할 때 5일 예보 데이터를 초기화
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=kr`)
            .then(response => {
                const { lat, lon } = response.data.coord;
                setMapCenter({ lat, lng: lon });
                setMarkerPosition({ lat, lng: lon });
                setWeatherData(response.data);

                // showForecast가 true인 경우 자동으로 fetchForecast를 호출
                if (showForecast) {
                    fetchForecast(lat, lon);
                }
            })
            .catch(err => {
                setError('날씨 정보를 가져오는데 실패했습니다');
                setWeatherData(null);
            });
    };

    const fetchForecast = (lat = markerPosition.lat, lon = markerPosition.lng) => {
        setError(null);
        if (!lat || !lon) {
            setError('먼저 날씨 검색을 통해 위치를 선택하세요.');
            return;
        }
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
            .then(response => {
                // 12:00:00 시간대의 데이터만 필터링
                const filteredData = response.data.list.filter(forecast =>
                    new Date(forecast.dt * 1000).getHours() === 12
                );
                setForecastData(filteredData);
                setShowForecast(true); 
                setButtonText("접기"); 
            })
            .catch(err => {
                setError('5일간의 날씨 예보를 가져오는데 실패했습니다.');
                setForecastData(null);
            });
    };

    const toggleForecast = () => {
        if (showForecast) {
            setShowForecast(false); 
            setButtonText("날씨 더보기"); 
        } else {
            fetchForecast(); 
        }
    };

    const handleMapClick = (e) => {
        const lat = e.latLng.lat();
        const lon = e.latLng.lng();
        setMarkerPosition({ lat, lng: lon });
        setMapCenter({ lat, lng: lon });
        fetchWeatherByCoordinates(lat, lon);
    };

    const getWeatherIcon = (icon) => {
        return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    };

    return (
        <div className="area" style={{ padding: '20px' }}>
            <div className="content">
                <AreaContent />
                <h2>날씨 검색</h2>
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={mapCenter}
                        zoom={6}  
                        onClick={handleMapClick}
                    >
                        <Marker position={markerPosition} />
                    </GoogleMap>
                </LoadScript>
                <div className="search-bar-container" style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            variant="outlined"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="지역을 영어로 입력하세요"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={fetchWeatherByLocation}
                            style={{ marginLeft: '10px', padding: '10px', fontSize: '16px', width:'100px', height:'50px', marginTop:'15px'}}
                        >
                            검색
                        </Button>
                    </div>
                    <p 
                        onClick={toggleForecast} 
                        style={{ marginTop: '10px', padding: '10px', fontSize: '16px', width:'100px', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {buttonText}
                    </p>
                </div>
                <div className="weather-result-container" style={{ marginTop: '20px' }}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {weatherData ? (
                        <div style={{ textAlign: 'left', fontSize: '18px' }}>
                            <h4>{weatherData.name}의 현재 날씨</h4>
                            <img src={getWeatherIcon(weatherData.weather[0].icon)} alt="날씨 아이콘" />
                            <p>기온: {weatherData.main.temp}°C</p>
                            <p>날씨: {weatherData.weather[0].description}</p>
                            <p>습도: {weatherData.main.humidity}%</p>
                            <p>풍속: {weatherData.wind.speed} m/s</p>
                        </div>
                    ) : (
                        <p>날씨 정보가 없습니다. 지역을 검색하세요.</p>
                    )}
                    {showForecast && forecastData && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px' }}>
                            {forecastData.map((forecast, index) => (
                                <div key={index} style={{ marginBottom: '10px', marginRight: '20px', textAlign: 'center' }}>
                                    <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                                    <p>기온: {forecast.main.temp}°C</p>
                                    <p>날씨: {forecast.weather[0].description}</p>
                                    <img src={getWeatherIcon(forecast.weather[0].icon)} alt="날씨 아이콘" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <ScrollToTopButton />
            </div>
        </div>
    );
};

export default AreaWeather;