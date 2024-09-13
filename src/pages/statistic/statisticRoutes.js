import { Route, Routes } from "react-router-dom";
import StatisticHome from "./statisticHome";
import MonthlyVisitor from "./monthlyVisitor";

import PopularPackages from "./popularPackages";
import SearchKeywords from "./searchKeywords";
import Alert from "./statisticAlert";


const StatisticRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<StatisticHome/>}/>
                
                <Route path="/monthlyVisitor" element={<MonthlyVisitor/>} />
                <Route path="/popularPackages" element={<PopularPackages/>}/>
                <Route path="/searchKeywords" element={<SearchKeywords/>}/>
                <Route path="/alert" element={<Alert/>}/>
            </Routes>
        </>
    );
};

export default StatisticRoutes;