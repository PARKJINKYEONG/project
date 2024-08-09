import React, { useState } from 'react';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import './adminHome.css';
import CommentManagement from './commentManagement';
import ReportManagement from './reportManagement';
import PostManagement from './postManagement';
import NoticeManagement from './noticeManagement';
import MemberManagement from './memberManagemenat';
import QuestionManagement from './questionManagement';
import Statistics from './statictics';

const AdminHome = () => {
    const [openMember, setOpenMember] = useState(false);
    const [openBoard, setOpenBoard] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleMemberClick = () => {
        setOpenMember(!openMember);
        setSelectedComponent('member-management');
    };

    const handleBoardClick = () => {
        setOpenBoard(!openBoard);
        setSelectedComponent('board-management');
    };

    const handleComponentClick = (component) => {
        setSelectedComponent(component);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'member-management':
                return <MemberManagement />;
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
            case 'statistics':
                return <Statistics />;
            default:
                return <div>Welcome to the Admin Page</div>;
        }
    };

    return (
        <div className="admin-container">
            <aside className="sidebar">
                <h1>목록</h1>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={handleMemberClick}>
                        <ListItemText primary="회원 정보 관리" />
                        {openMember ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openMember} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => handleComponentClick('member-management/change-info')} sx={{ pl: 4 }}>
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
                    <Collapse in={openBoard} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
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
            <main className="main-content">
                {renderComponent()}
            </main>
        </div>
    );
};

export default AdminHome;
