import React from 'react';
import { Route, Routes} from "react-router-dom";
import Privacy from './privacy';
import LoginSecurity from './loginSecurity';
import AccountHome from './accountHome';
import AccountLock from './accountLock';
import MemberInfoEdit from '../mypage/memberInfoEdit';
import ReportAndInqueiryList from '../mypage/report&inquiryList';
import Inquiry from '../mypage/inquiry';


const ChangeInfoRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AccountHome/>} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/loginSecurity" element={<LoginSecurity />} />
                <Route path="/accountLock" element={<AccountLock />} />
                <Route path="/memberInfoEdit" element={<MemberInfoEdit />} />
                <Route path="/reportAndInqueiryList" element={<ReportAndInqueiryList />} />
                <Route path="/inquiery" element={<Inquiry />} />
            </Routes>
        </>
    );
};

export default ChangeInfoRoutes;
