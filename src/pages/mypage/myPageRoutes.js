import { Route, Routes } from "react-router-dom";
import MyPage from "./myPage";

import MyReview from "./review/myReview";
import MyReViewCreate from "./review/myReViewCreate";
import MyReViewEdit from "./review/myReViewEdit";

import MemberInfoEdit from "./memberInfoEdit";
import ReportAndInquiryList from "./report&inquiryList";
import PlanCalendar from './planCalendar';
import BookmarkRoutes from "../bookmark/bookmarkRoutes";

import ProfilePage from "./profilePage";
import AddSpeciality from "./addSpeciality";
import AlarmDetail from "./alarmDetail";
import AlarmView from "./alarmView";


export default function MyPageRoutes(){

    return <>
        <Routes>
            <Route element={<MyPage/>}>
                <Route path="/" element={<PlanCalendar/>}/>
                <Route path="/plan" element={<PlanCalendar/>}/>

                <Route path="/myreview" element={<MyReview/>}/>
                <Route path="/create-review" element={<MyReViewCreate/>}/>
                <Route path="/edit-review" element={<MyReViewEdit/>}/>
                
                <Route path="/memberInfoEdit" element={<MemberInfoEdit/>}/>
                <Route path="/reportAndInqueiryList" element={<ReportAndInquiryList/>}/>
                <Route path="/bookmark" element={<BookmarkRoutes/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/addspecial" element={<AddSpeciality/>}/>
                <Route path="/alarmDetail" element={<AlarmDetail/>}/>
                <Route path="/alarmView" element={<AlarmView/>}/>                
            </Route>
        </Routes>
    </>
}