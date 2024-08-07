import React,{useState,useEffect} from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/member/login";
import Template from "./pages/template";
import ChangeInfoRoutes from './pages/changeInfoAsManager/changeInfoRoutes';
import BookmarkRoutes from "./pages/bookmark/bookmarkRoutes";
import QnA from "./userQna";
import StatisticRoutes from "./pages/statistic/statisticRoutes";
import './components/styles/common.css'
import ReviewList from "./pages/tripreview/ReviewList";
import CreateTripReview from "./pages/tripreview/CreateTripReview";

function App() {



    return <>
        <Routes>
            <Route element={<Template/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/place"></Route>
                <Route path="/plan"></Route>
                <Route path="/notice"></Route>
                <Route path="/admin" />
                <Route path="/changeInfo/*" element={<ChangeInfoRoutes/>} />
                <Route path="/bookmark/*" element={<BookmarkRoutes/>} />
                <Route path="/userQna" element={<QnA/>}></Route>
                <Route path="/statistics/*" element={<StatisticRoutes/>}/>
                <Route path="/ReviewList" element={<ReviewList />}/>
                <Route path="/CreateTripReview" element={<CreateTripReview />}/>

            </Route>
        </Routes>
    </>
}

export default App;