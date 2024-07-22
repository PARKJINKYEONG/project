import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Privacy from './privacy';
import Notifications from './notifications';
import LoginSecurity from './loginSecurity';
import AccountHome from './accountHome';

const ChangeInfoRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/accountHome" element={<AccountHome/>} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/loginSecurity" element={<LoginSecurity />} />
            </Routes>
        </>
    );
};

export default ChangeInfoRoutes;
