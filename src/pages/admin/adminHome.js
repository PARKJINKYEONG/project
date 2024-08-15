import React, { useState } from 'react';
import { List, ListItemButton, ListItemText, Collapse, AppBar, Toolbar, IconButton, Drawer, Typography, Button, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const AdminHome = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [openBoard, setOpenBoard] = useState(false);
       

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleMemberClick = () => {
        setOpenMember(!openMember);

    };

    const handleBoardClick = () => {
        setOpenBoard(!openBoard);

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
                            <ListItemButton component={Link} to="privacy" sx={{ pl: 4 }}>
                                <ListItemText primary="회원 정보 변경" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="delete" sx={{ pl: 4 }}>
                                <ListItemText primary="로그인 및 보안" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="restrict" sx={{ pl: 4 }}>
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
                            <ListItemButton component={Link} to="notice" sx={{ pl: 4 }}>
                                <ListItemText primary="공지 사항" /> 
                            </ListItemButton>
                            <ListItemButton component={Link} to="comments" sx={{ pl: 4 }}>
                                <ListItemText primary="채팅 문의 관리" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="questions" sx={{ pl: 4 }}>
                                <ListItemText primary="문의 관리" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="reports" sx={{ pl: 4 }}>
                                <ListItemText primary="신고 관리" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton component={Link} to="statistics">
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
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminHome;