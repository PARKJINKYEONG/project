import { Route, Routes } from "react-router-dom"
import List from "./list.js";
import View from "./view.js";
import Form from "./form.js";
import React from 'react';

const BoardRoutes =()=>{
    return <>
        <Routes>
            <Route path="/" element={<List/>}/>
            <Route path="/form" element={<Form/>}/>
            <Route path="/:id" element={<View/>}/>
        </Routes>
    </>
};
export default BoardRoutes;








