import { Route, Routes } from "react-router-dom";
import StatisticHome from "./statisticHome";

const StatisticRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<StatisticHome/>}/>
                <Route path="/dailyVisitor"  />
                <Route path="/monthlyVisitor"  />
                <Route path="/pageStacyTime" />
                <Route path="/popularPackages" />
                <Route path="/searchKeywords" />
            </Routes>
        </>
    );
};

export default StatisticRoutes;