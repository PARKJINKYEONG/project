import { Route, Routes } from "react-router-dom";
import StatisticHome from "./statisticHome";
import DailyVisitor from "./dailyVisitor";
import MonthlyVisitor from "./monthlyVisitor";

import PopularPackages from "./popularPackages";
import SearchKeywords from "./searchKeywords";


const StatisticRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<StatisticHome/>}/>
                <Route path="/dailyVisitor"  element={<DailyVisitor/>}/>
                <Route path="/monthlyVisitor" element={<MonthlyVisitor/>} />
                <Route path="/popularPackages" element={<PopularPackages/>}/>
                <Route path="/searchKeywords" element={<SearchKeywords/>}/>
            </Routes>
        </>
    );
};

export default StatisticRoutes;