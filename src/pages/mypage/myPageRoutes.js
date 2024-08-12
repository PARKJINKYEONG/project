import { Route, Routes } from "react-router-dom";
import PlanManagement from "./planManagement";
import MyPage from "./myPage";

export default function MyPageRoutes(){

    return <>
        <Routes>
            <Route element={<MyPage/>}>
                <Route path="/" element={<PlanManagement/>}/>
                <Route path="/plan" element={<PlanManagement/>}/>
                
            </Route>
        </Routes>
    </>
}