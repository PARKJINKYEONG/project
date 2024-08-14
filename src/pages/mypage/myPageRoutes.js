import { Route, Routes } from "react-router-dom";
import MyPage from "./myPage";
import MemberInfoEdit from "./memberInfoEdit";
import ReportAndInquiryList from "./report&inquiryList";
import PlanCalendar from './planCalendar';
import BookmarkRoutes from "../bookmark/bookmarkRoutes";
import AddSpeciality from "./addSpeciality";


export default function MyPageRoutes(){

    return <>
        <Routes>
            <Route element={<MyPage/>}>
                <Route path="/" element={<PlanCalendar/>}/>
                <Route path="/plan" element={<PlanCalendar/>}/>
                <Route path="/memberInfoEdit" element={<MemberInfoEdit/>}/>
                <Route path="/reportAndInqueiryList" element={<ReportAndInquiryList/>}/>
                <Route path="/bookmark" element={<BookmarkRoutes/>}/>
                <Route path="/addspecial" element={<AddSpeciality/>}/>
            </Route>
        </Routes>
    </>
}