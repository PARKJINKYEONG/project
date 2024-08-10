import { Route, Routes } from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";

import MyPage from "./myPage";


export default function UserRoutes(){

    return <>
        <Routes>

            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}  />
        </Routes>
    </>
}