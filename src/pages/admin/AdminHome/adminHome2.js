import React, { useState } from 'react';
import styles from '../../../styles/admin/adminHome.module.css';
import { Link, Route, Routes } from 'react-router-dom';
import SideMenuBar from './sideMenuBar';
import AdminHeader from './adminHeader';
import ChatManagement from '../chatManagement/chatManagement';
import NoticeManagement from '../notice/noticeManagement';

const AdminHome2 = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedSubMenu, setSelectedSubMenu] = useState(''); // 현재 선택된 서브메뉴의 제목을 저장

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSubMenuSelect = (title) => {
        setSelectedSubMenu(title);
    };

    return <>       
            <div className={`${styles.adminContainer} nanumsqr-korfont`}>
                <SideMenuBar 
                    isSidebarOpen={isSidebarOpen} 
                    toggleSidebar={toggleSidebar} 
                    onSubMenuSelect={handleSubMenuSelect} 
                />

                <div className={styles.mainContent}>
                    <AdminHeader title={selectedSubMenu} />
                    <Routes>
                        <Route path="notice" element={<NoticeManagement />} />
                        <Route path="chatting" element={<ChatManagement />} /> 
                    </Routes>            
                </div>
            </div>
        
    </>
};

export default AdminHome2;