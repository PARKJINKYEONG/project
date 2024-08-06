import React from 'react';
import { Route, Routes} from "react-router-dom";
import Privacy from './privacy';
import LoginSecurity from './loginSecurity';
import AccountHome from './accountHome';

const ChangeInfoRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AccountHome/>} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/loginSecurity" element={<LoginSecurity />} />
            </Routes>
        </>
    );
};

export default ChangeInfoRoutes;
