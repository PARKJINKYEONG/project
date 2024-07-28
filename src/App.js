import React,{useState,useEffect} from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/member/login";
import Template from "./pages/template";
import ChangeInfoRoutes from './pages/changeInfo/changeInfoRoutes';


function App() {

    // RESTAPI와 연동 시도중
    // const [hello,setHello] = useState()
    // useEffect(()=>{
    //     axios.get('/api/hello')
    //     .then(response=>setHello(response.data))
    //     .catch(error=>console.log(error))

    // },[]);

    // return <>
    //     <div>백엔드 연동 : {hello} </div>

    // </>


    return <>
    
        <Routes>
            <Route element={<Template/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/place"></Route>
                <Route path="/plan"></Route>
                <Route path="/notice"></Route>
                <Route path="/admin" />
                <Route path="/changeInfo/*" element=<ChangeInfoRoutes/> />

            </Route>
        </Routes>
    </>
}

export default App;
