import React from'react';
import { Route, Routes } from 'react-router-dom';
import AdminHome from './adminHome';
import StatisticHome from '../statistic/statisticHome';
import Privacy from '../changeInfoAsManager/privacy';
import LoginSecurity from '../changeInfoAsManager/loginSecurity';
import AccountLock from '../changeInfoAsManager/accountLock';
import NoticeManagement from './notice/noticeManagement';
import CommentManagement from './commentManagement';
import QuestionManagement from './QnA/questionManagement';
import CollapsibleTable from './reportManagement';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminHome />}>
                <Route path="" element={<StatisticHome />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="delete" element={<LoginSecurity />} />
                <Route path="restrict" element={<AccountLock />} />
                <Route path="notice" element={<NoticeManagement />} />
                <Route path="comments" element={<CommentManagement />} />
                <Route path="questions" element={<QuestionManagement />} />
                <Route path="reports" element={<CollapsibleTable />} />
                <Route path="statistics" element={<StatisticHome />} />
            </Route>
        </Routes>
    );
};
export default AdminRoutes;