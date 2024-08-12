import React from 'react';
import { Route, Routes} from "react-router-dom";
import Privacy from './privacy';
import LoginSecurity from './loginSecurity';
import AccountHome from './accountHome';
import AccountLock from './accountLock';

const ChangeInfoRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AccountHome/>} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/loginSecurity" element={<LoginSecurity />} />
                <Route path="/accountLock" element={<AccountLock />} />
            </Routes>
        </>
    );
};

export default ChangeInfoRoutes;
