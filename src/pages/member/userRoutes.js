import { Route, Routes } from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";
import FindPassword from "./findPassword";



export default function UserRoutes(){

    return <>
        <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}  />
            <Route path="/findpw" element={<FindPassword/>}/>
        </Routes>
    </>
}