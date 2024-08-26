import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Tooltip, Badge } from '@mui/material';
import { mdiMessageDraw } from '@mdi/js';
import Icon from '@mdi/react';
import Alarm from './mypage/alarm';
import SignOutButton from './member/signout';

import style from "../styles/Header.module.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [alarmCount, setAlarmCount] = useState(1);
    const [showTravelMenu, setShowTravelMenu] = useState(false);
    const [showPlanMenu, setShowPlanMenu] = useState(false);
    const [showQnAMenu, setShowQnAMenu] = useState(false);
    const [showMyPageMenu, setShowMyPageMenu] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleTravelMenuOpen = () => setShowTravelMenu(true);
    const handleTravelMenuClose = () => setShowTravelMenu(false);

    const handlePlanMenuOpen = () => setShowPlanMenu(true);
    const handlePlanMenuClose = () => setShowPlanMenu(false);

    const handleQnAMenuOpen = () => setShowQnAMenu(true);
    const handleQnAMenuClose = () => setShowQnAMenu(false);

    const handleMyPageMenuOpen = () => setShowMyPageMenu(true);
    const handleMyPageMenuClose = () => setShowMyPageMenu(false);

    return (
        <AppBar position="fixed" color="primary" sx={{ height: '56px', zIndex: 1300 }}>
            <Toolbar sx={{ minHeight: '56px', paddingLeft: '16px', paddingRight: '16px' }}>
                <Link to="/" className={style.logoContainer} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/images/sample_logo.png" alt="logo" className={style.logoStyle} style={{ height: '40px', marginRight: '8px' }} />
                    <Typography variant="h6" noWrap className={style.headerTitle} sx={{ fontSize: '1.25rem' }}>
                        Travel Joy
                    </Typography>
                </Link>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, position: 'relative' }}>
                    <div 
                        onMouseEnter={handlePlanMenuOpen}
                        onMouseLeave={handlePlanMenuClose}
                        style={{ position: 'relative' }}
                    >
                        <Button color="inherit" className={style.navLink}>
                            New Plan
                        </Button>
                        {showPlanMenu && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    backgroundColor: 'white',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1400,
                                    minWidth: '180px',
                                }}
                                onMouseEnter={handlePlanMenuOpen}
                                onMouseLeave={handlePlanMenuClose}
                            >
                                <Link to="/createPlan" className={style.menuItem}>계획</Link>
                            </Box>
                        )}
                    </div>

                    <div 
                        onMouseEnter={handleTravelMenuOpen}
                        onMouseLeave={handleTravelMenuClose}
                        style={{ position: 'relative' }}
                    >
                        <Button color="inherit" className={style.navLink}>
                            여행 정보
                        </Button>
                        {showTravelMenu && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    backgroundColor: 'white',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1400,
                                    minWidth: '180px',
                                }}
                                onMouseEnter={handleTravelMenuOpen}
                                onMouseLeave={handleTravelMenuClose}
                            >
                                <Link to="/place" className={style.menuItem}>해외여행</Link>
                                <Link to="/domesticTravel" className={style.menuItem}>국내여행</Link>
                                <Link to="/popularTravel" className={style.menuItem}>인기여행</Link>
                            </Box>
                        )}
                    </div>

                    <div 
                        onMouseEnter={handleQnAMenuOpen}
                        onMouseLeave={handleQnAMenuClose}
                        style={{ position: 'relative' }}
                    >
                        <Button color="inherit" className={style.navLink}>
                            Q&A
                        </Button>
                        {showQnAMenu && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    backgroundColor: 'white',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1400,
                                    minWidth: '180px',
                                }}
                                onMouseEnter={handleQnAMenuOpen}
                                onMouseLeave={handleQnAMenuClose}
                            >
                                <Link to="/FaQ" className={style.menuItem}>FAQ</Link>
                                <Link to="/Ecrm" className={style.menuItem}>신고접수</Link>
                            </Box>
                        )}
                    </div>

                    
                    <Button component={NavLink} to="/announcement" color="inherit" className={style.navLink}>
                        Notice
                    </Button>
                    
                    <Button component={NavLink} to="/ReviewList" color="inherit" className={style.navLink}>
                        <Icon path={mdiMessageDraw} size={1} />
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="inherit">
                        <Badge badgeContent={alarmCount} color="error">
                            <img src="/images/bell.svg" alt="alarm" style={{ width: '24px', height: '24px' }} />
                        </Badge>
                    </IconButton>

                    <Alarm isDropdownVisible={false} setIsDropdownVisible={() => {}} />

                    <Tooltip title="마이페이지">
                        <IconButton onClick={handleMenuOpen} color="inherit">
                            <img src="/images/person-circle.svg" alt="profile" style={{ width: '24px', height: '24px' }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={handleMenuClose} component={Link} to="/mypage/plan">일정</MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/mypage/myreview">리뷰</MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/mypage/bookmark">즐겨찾기</MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/mypage/profile">프로필</MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/mypage/reportAndInqueiryList">신고 및 문의</MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/mypage/memberInfoEdit">내 정보 수정</MenuItem>
                    </Menu>
                    
                    <SignOutButton />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
