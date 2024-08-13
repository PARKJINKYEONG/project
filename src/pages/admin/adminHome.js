import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Collapse, AppBar, Toolbar, IconButton, Drawer, Typography, Button, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CommentManagement from './commentManagement';
import ReportManagement from './reportManagement';
import PostManagement from './postManagement';
import NoticeManagement from './notice/noticeManagement';
import Statistics from './statictics';
import MemberManagement from './user/memberManagemenat';
import MemberDeleteManagement from './user/memberDeleteManagement';
import QuestionManagement from './QnA/questionManagement';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StatisticHome from './../statistic/statisticHome';
import Privacy from '../changeInfoAsManager/privacy';
import LoginSecurity from '../changeInfoAsManager/loginSecurity';
import AccountLock from '../changeInfoAsManager/accountLock';

const AdminHome = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [openBoard, setOpenBoard] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState();    

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleMemberClick = () => {
        setOpenMember(!openMember);

    };

    const handleBoardClick = () => {
        setOpenBoard(!openBoard);

    };

    const handleComponentClick = (component) => {
        setSelectedComponent(component);
        setOpenDrawer(false);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'member-management':
                return <Privacy/>;
            case 'member-management/delete':
                return <LoginSecurity/>;
            case 'member-management/restrict':
                return <AccountLock/>;
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
                return <StatisticHome />;
        }
    };

    return (
        <Box>            
            <AppBar position="fixed" sx={{ top: 0}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        관리자 페이지
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        <HomeIcon />
                    </IconButton>            
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={openDrawer}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: { width: 250,top: 0 }
                }}
            >
                <List>
                    <ListItemButton onClick={handleMemberClick}>
                        <ListItemText primary="회원 정보 관리" />
                        {openMember ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openMember}>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => handleComponentClick('member-management')} sx={{ pl: 4 }}>
                                <ListItemText primary="회원 정보 변경" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleComponentClick('member-management/delete')} sx={{ pl: 4 }}>
                                <ListItemText primary="로그인 및 보안" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleComponentClick('member-management/restrict')} sx={{ pl: 4 }}>
                                <ListItemText primary="계정제한" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleBoardClick}>
                        <ListItemText primary="게시판 관리" />
                        {openBoard ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openBoard}>
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
            </Drawer>
            <Box
                sx={{
                    marginTop: '80px',
                    position: 'relative',
                    padding: '16px',
                    
                }}
            >
                {renderComponent()}
            </Box>
        </Box>
    );
};

export default AdminHome;