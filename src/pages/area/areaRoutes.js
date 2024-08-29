import React from 'react';
import { Route, Routes, Outlet } from "react-router-dom";
import AreaPage from './areaPage';
import RestaurantSearch from './restaurantSearch';
import WeatherSearch from './weatherSearch';
import FlightSearch from './flightSearch';
import AreaLocal from './areaLocal';
import HotelSearch from './hotelSearch';

const AreaRoutes = () => {
    return (
        <div style={{ display: 'flex' }}>
            {/* 좌측 내비게이션 바 */}
            
            {/* 우측 메인 콘텐츠 */}
            <div style={{ flexGrow: 1, padding: '16px' }}>
                <Routes>
                    <Route path="/areaLocal" element={<AreaLocal/>} />
                    <Route path="/restaurantSearch" element={<RestaurantSearch/>} />
                    <Route path="/weatherSearch" element={<WeatherSearch/>} />
                    <Route path="/flightSearch" element={<FlightSearch/>} />
                    <Route path="/hotelSearch" element={<HotelSearch/>} />
                </Routes>
                <Outlet />
            </div>
        </div>
    );
};

export default AreaRoutes;
