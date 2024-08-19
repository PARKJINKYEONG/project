import React from 'react';
import { Route, Routes } from "react-router-dom";
import AreaHome from "./areaHome";

import AreaWeather from './areaWeather';
const AreaRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AreaHome/>}/>
                <Route path="/tourspot"  />
                <Route path="/accomodation"  />
                <Route path="/restaurant"  />
                <Route path="/transport" />
                <Route path="/weather" element={<AreaWeather/>}/>
            </Routes>
        </>
    );
};

export default AreaRoutes;