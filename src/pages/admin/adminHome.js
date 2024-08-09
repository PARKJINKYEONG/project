import React, { useState } from 'react';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import styles from '../../styles/adminHome.module.css';
import CommentManagement from './commentManagement';
import ReportManagement from './reportManagement';
import PostManagement from './postManagement';
import NoticeManagement from './notice/noticeManagement';
import Statistics from './statictics';
import MemberManagement from './user/memberManagemenat';
import MemberDeleteManagement from './user/memberDeleteManagement';
import QuestionManagement from './QnA/questionManagement';

const AdminHome = () => {
    const [openMember, setOpenMember] = useState(true);
    const [openBoard, setOpenBoard] = useState(true);
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleMemberClick = () => {
        setOpenMember(!openMember);

    };

    const handleBoardClick = () => {
        setOpenBoard(!openBoard);

    };

    const handleComponentClick = (component) => {
        setSelectedComponent(component);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'member-management':
                return <MemberManagement />;
            case 'member-management/delete':
                return <MemberDeleteManagement/>;    
            case 'board-management/notice':
                return <NoticeManagement />;
            case 'board-management/posts':
                return <PostManagement />;
            case 'board-management/comments':
                return <CommentManagement />;
            case 'board-management/questions':
                return <QuestionManagement />;
            case 'board-management/reports':
                return <ReportManagement />;
            default:
                return <Statistics />;
        }
    };

    return (
        <div className={styles.adminContainer}>

                <aside className={styles.sidebar}>
                    <h1 className={styles.sidebarTitle}>관리자 페이지</h1>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListItemButton onClick={handleMemberClick}>
                            <ListItemText primary="회원 정보 관리" />
                            {openMember ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openMember} >
                            <List component="div" >
                                <ListItemButton onClick={() => handleComponentClick('member-management')} sx={{ pl: 4 }}>
                                    <ListItemText primary="회원 정보 변경" />
                                </ListItemButton>
                                <ListItemButton onClick={() => handleComponentClick('member-management/delete')} sx={{ pl: 4 }}>
                                    <ListItemText primary="회원 삭제" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={handleBoardClick}>
                            <ListItemText primary="게시판 관리" />
                            {openBoard ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openBoard} >
                            <List component="div" >
                                <ListItemButton onClick={() => handleComponentClick('board-management/notice')} sx={{ pl: 4 }}>
                                    <ListItemText primary="공지 사항" />
                                </ListItemButton>
                                <ListItemButton onClick={() => handleComponentClick('board-management/posts')} sx={{ pl: 4 }}>
                                    <ListItemText primary="게시글 관리" />
                                </ListItemButton>
                                <ListItemButton onClick={() => handleComponentClick('board-management/comments')} sx={{ pl: 4 }}>
                                    <ListItemText primary="댓글 관리" />
                                </ListItemButton>
                                <ListItemButton onClick={() => handleComponentClick('board-management/questions')} sx={{ pl: 4 }}>
                                    <ListItemText primary="문의 관리" />
                                </ListItemButton>
                                <ListItemButton onClick={() => handleComponentClick('board-management/reports')} sx={{ pl: 4 }}>
                                    <ListItemText primary="신고 관리" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={() => handleComponentClick('statistics')}>
                            <ListItemText primary="통계" />
                        </ListItemButton>
                    </List>
                </aside>
                <main className={styles.mainContent}>     
                    {renderComponent()}                
                </main>

        </div>
    );
};

export default AdminHome;