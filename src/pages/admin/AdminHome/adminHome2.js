import React, { useState } from 'react';
import styles from '../../../styles/admin/adminHome.module.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import SideMenuBar from './sideMenuBar';
import AdminHeader from './adminHeader';
import ChatManagement from '../chatManagement/chatManagement';

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
                <Outlet/>
                {/* <Routes>
                    <Route path="chatting" component={ChatManagement} /> */}
                    {/* <Route path="/anotherRoute" component={AnotherComponent} /> */}
                {/* </Routes> */}
                </div>
            </div>
        
    </>
};

export default AdminHome2;