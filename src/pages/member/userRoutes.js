import { Route, Routes } from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";



export default function UserRoutes(){

    return <>
        <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}  />
        </Routes>
    </>
}