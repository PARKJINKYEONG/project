import React,{useState,useEffect} from "react";
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


import Announcement from "./pages/clientService/announcement";
import MyPageRoutes from "./pages/mypage/myPageRoutes";
import QnA from "./pages/clientService/userQna";
import Ecrm from "./pages/clientService/eCrm";
import AdminRoutes from "./pages/admin/adminRoutes";

import { RouteMap } from "./pages/routeMap";
import BoardRoutes from "./pages/board/boardRoutes";
import FaQ from "./pages/clientService/userFaq";

import CreateUserQnA from "./pages/clientService/createUserQnA";
import AnnouncementView from "./pages/clientService/announcementView";
import { UserContext } from "./contexts/userContext";
import AreaRoutes from "./pages/area/areaRoutes";
import ChatManagement from "./pages/admin/chatManagement/chatManagement";


function App() {
  const [accessToken,setAccessToken] = useState(localStorage.getItem('accessToken') || "");
  const [email, setEmail] = useState(localStorage.getItem('email') || "");
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') || "");

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAdmin]);

    return <>
    <UserContext.Provider value={{accessToken, setAccessToken, email, setEmail, isAdmin, setIsAdmin}}>
        <Routes>
            <Route element={<Template/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/user/*" element={<UserRoutes/>}></Route>
                <Route path="/place/*" element={<AreaRoutes/>} ></Route>
                <Route path="/createPlan" element={<CreatePlan/>}></Route>
                <Route path="/notice"></Route>
                <Route path="/changeInfo/*" element={<ChangeInfoRoutes/>} />
                <Route path="/bookmark/*" element={<BookmarkRoutes/>} />
                <Route path="/userQna" element={<QnA/>}></Route>
                <Route path="/userFaq" element={<FaQ/>}></Route>
                <Route path="/eCrm" element={<Ecrm/>}></Route>
                <Route path="/announcement" element={<Announcement/>}></Route>
                <Route path="/announcement/:id" element={<AnnouncementView/>}/>
                <Route path="/statistics/*" element={<StatisticRoutes/>}/>
                <Route path="/mypage/*" element={<MyPageRoutes />} />
                <Route path="/ReviewList" element={<ReviewList />}/>
                <Route path="/CreateReview" element={<CreateReview />}/>
                <Route path="/EditReview/:id" element={<EditReview />} />
                <Route path="/board/*" element={<BoardRoutes />} />
                <Route path="/userQna/create" element={<CreateUserQnA />} />
                
            </Route>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/testroute" element={<RouteMap/>} />
            <Route path="/chatmangement" element={<ChatManagement/>} />
        </Routes>
        </UserContext.Provider>
    </>
}

export default App;