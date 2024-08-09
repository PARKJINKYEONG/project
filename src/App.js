import React,{useState,useEffect} from "react";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/member/login";
import Template from "./pages/template";
import ChangeInfoRoutes from './pages/changeInfoAsManager/changeInfoRoutes';
import BookmarkRoutes from "./pages/bookmark/bookmarkRoutes";
import StatisticRoutes from "./pages/statistic/statisticRoutes";
import './styles/common.css'
import ReviewList from "./pages/tripreview/ReviewList";
import CreateTripReview from "./pages/tripreview/CreateTripReview";
import QnA from "./pages/clientService/userQna";
import UserFaq from "./pages/clientService/userFaq";
import { Announcement } from "@mui/icons-material";

import AdminHome from "./pages/admin/adminHome";
import PlanManagement from "./pages/admin/planManagement";

function App() {



    return <>
        <Routes>
            <Route element={<Template/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/place"></Route>
                <Route path="/plan"></Route>
                <Route path="/notice"></Route>
                <Route path="/changeInfo/*" element={<ChangeInfoRoutes/>} />
                <Route path="/bookmark/*" element={<BookmarkRoutes/>} />
                <Route path="/userQna" element={<QnA/>}></Route>
                <Route path="/userFaq" element={<UserFaq/>}></Route>
                <Route path="/announcement" element={<Announcement/>}></Route>

                <Route path="/statistics/*" element={<StatisticRoutes/>}/>
                <Route path="/mypage/*" element={<PlanManagement />} />
                <Route path="/admin/*" element={<AdminHome />} />
                <Route path="/ReviewList" element={<ReviewList />}/>
                <Route path="/CreateTripReview" element={<CreateTripReview />}/>

            </Route>
        </Routes>
    </>
}

export default App;