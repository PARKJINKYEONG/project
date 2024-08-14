import React,{useState,useEffect} from "react";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import Template from "./pages/template";
import ChangeInfoRoutes from './pages/changeInfoAsManager/changeInfoRoutes';
import BookmarkRoutes from "./pages/bookmark/bookmarkRoutes";
import StatisticRoutes from "./pages/statistic/statisticRoutes";

import './styles/common.css'
import ReviewList from "./pages/tripreview/ReviewList";
import CreateReview from "./pages/tripreview/CreateReview"
import EditReview from "./pages/tripreview/EditReview"

import UserRoutes from "./pages/member/userRoutes";
import CreatePlan from "./pages/plan/createPlan";

import QnA from "./pages/clientService/userQna";
import UserFaq from "./pages/clientService/userFaq";
import Announcement from "./pages/clientService/announcement";

import MyPageRoutes from "./pages/mypage/myPageRoutes";

import AdminRoutes from "./pages/admin/adminRoutes";

import { RouteMap } from "./pages/routeMap";


function App() {



    return <>
        <Routes>
            <Route element={<Template/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/user/*" element={<UserRoutes/>}></Route>
                <Route path="/place"></Route>
                <Route path="/createPlan" element={<CreatePlan/>}></Route>
                <Route path="/notice"></Route>
                <Route path="/changeInfo/*" element={<ChangeInfoRoutes/>} />
                <Route path="/bookmark/*" element={<BookmarkRoutes/>} />
                <Route path="/userQna" element={<QnA/>}></Route>
                <Route path="/userFaq" element={<UserFaq/>}></Route>
                <Route path="/announcement" element={<Announcement/>}></Route>
                <Route path="/statistics/*" element={<StatisticRoutes/>}/>
                <Route path="/mypage/*" element={<MyPageRoutes />} />
                <Route path="/ReviewList" element={<ReviewList />}/>
                <Route path="/CreateReview" element={<CreateReview />}/>
                <Route path="/EditReview/:id" element={<EditReview />} />
            </Route>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/testroute" element={<RouteMap/>} />
        </Routes>
    </>
}

export default App;