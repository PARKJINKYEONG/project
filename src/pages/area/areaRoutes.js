import React from 'react';
import { Route, Routes } from "react-router-dom";
import AreaHome from "./areaHome";
import WeatherSearch from './weatherSearch';
import FlightSearch from './flightSearch';

const AreaRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AreaHome/>}/>
                <Route path="/tourspot"  />
                <Route path="/accomodation"  />
                <Route path="/restaurant"  />
                <Route path="/transport" />
                <Route path="/weather" element={<WeatherSearch/>}/>
                <Route path="/flightSearch" element={<FlightSearch/>}/>

            </Routes>
        </>
    );
};

export default AreaRoutes;