import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import style from "../styles/Header.module.css";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Icon from '@mdi/react';
import { mdiMessageDraw } from '@mdi/js';
import { Tooltip, Menu, MenuItem, IconButton } from "@mui/material";

export default function Header() {

    const activeStyle = { fontWeight: 'normal' };
    const [isShow, setIsShow] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <nav className="navbar navbar-expand-md fixed-top style.header roboto-condensed-engfont " id="bg-color">
                {(!isShow) ? (
                    <div className="container-fluid">
                        <div className="col-4">
                            <Link className="navbar-brand" to="/">
                                <Tooltip title='홈화면'>
                                    <img src="/images/sample_logo.png" className={style.logoStyle} style={{ width: '50px', height: '50px' }} alt="logo" />
                                </Tooltip>
                            </Link>
                        </div>
                        <div className="col-4 text-center fs-2 playwrite-dk-loopet-engfont" onClick={() => { setIsShow(!isShow) }}>
                            <span className={style.headerTitle}>Travel Joy</span>
                        </div>
                        <div className="col-4">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="mynavbar">
                                <ul className="navbar-nav ms-auto ">
                                    <li className="nav-item">
                                        <Tooltip title="로그인">
                                            <NavLink className={`nav-link ${style.iconStyle}`} to="/user/signin"> Sign In </NavLink>
                                        </Tooltip>
                                    </li>
                                    <li className="nav-item">
                                        <Tooltip title="회원가입">
                                            <NavLink className={`nav-link ${style.iconStyle}`} to="/user/signup"> Sign Up </NavLink>
                                        </Tooltip>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container-fluid {style.tjheader}">
                        <div className="col-6">
                            <Link className={`navbar-brand ${style.iconStyle}`} to="/">
                                <img src="/images/sample_logo.png" style={{ width: '50px', height: '50px' }} alt="logo" />
                            </Link>
                            <div className={style.headerTitle} onClick={() => { setIsShow(!isShow) }}>Travel Joy</div>
                        </div>
                        <div className="col-6 text-end">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="mynavbar">
                                <ul className="navbar-nav ms-auto gap-3">
                                    <li className="nav-item">
                                        <Tooltip title='일정 계획'>
                                            <NavLink className={`nav-link ${style.iconStyle}`} to="/createPlan" style={({ isActive }) => isActive ? activeStyle : null}>
                                                New Plan <img src="/images/plus-circle.svg" style={{ width: '15px', height: '15px' }} alt="new plan" />
                                            </NavLink>
                                        </Tooltip>
                                    </li>
                                    <li className="nav-item">
                                        <Tooltip title='공지사항'>
                                            <NavLink className={`nav-link ${style.iconStyle}`} to="/announcement" style={({ isActive }) => isActive ? activeStyle : null}> Notice </NavLink>
                                        </Tooltip>
                                    </li>
                                    <li className="nav-item">
                                        <Tooltip title='문의사항'>
                                            <NavLink className={`nav-link ${style.iconStyle}`} to="/userQna" style={({ isActive }) => isActive ? activeStyle : null}> Q&A </NavLink>
                                        </Tooltip>
                                    </li>
                                    <li className="nav-item">
                                        <Tooltip title="마이페이지">
                                            <IconButton onClick={handleClick} className={style.iconStyle}>
                                                <img src="/images/person-circle.svg" style={{ width: '20px', height: '20px' }} alt="profile" />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={handleClose} component={Link} to="/mypage/plan" 
                                            sx={{ transition: 'all 0.3s ease', '&:hover': 
                                            { backgroundColor: '#f0f0f0', transform: 'scale(1.05)' } }}>일정</MenuItem>

                                            <MenuItem onClick={handleClose} component={Link} to="/mypage/review" 
                                            sx={{ transition: 'all 0.3s ease', '&:hover': 
                                            { backgroundColor: '#f0f0f0', transform: 'scale(1.05)' } }}>리뷰</MenuItem>

                                            <MenuItem onClick={handleClose} component={Link} to="/mypage/bookmark" 
                                            sx={{ transition: 'all 0.3s ease', '&:hover': 
                                            { backgroundColor: '#f0f0f0', transform: 'scale(1.05)' } }}>즐겨찾기</MenuItem>

                                            <MenuItem onClick={handleClose} component={Link} to="/mypage/profile" 
                                            sx={{ transition: 'all 0.3s ease', '&:hover': 
                                            { backgroundColor: '#f0f0f0', transform: 'scale(1.05)' } }}>프로필</MenuItem>

                                            <MenuItem onClick={handleClose} component={Link} to="/mypage/reportAndInqueiryList" 
                                            sx={{ transition: 'all 0.3s ease', '&:hover': 
                                            { backgroundColor: '#f0f0f0', transform: 'scale(1.05)' } }}>신고 및 문의</MenuItem>

                                            <MenuItem onClick={handleClose} component={Link} to="/mypage/memberInfoEdit" 
                                            sx={{ transition: 'all 0.3s ease', '&:hover': 
                                            { backgroundColor: '#f0f0f0', transform: 'scale(1.05)' } }}>내 정보 수정</MenuItem>

                                        </Menu>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={`nav-link ${style.iconStyle}`} to="/" style={({ isActive }) => isActive ? activeStyle : null}>
                                            <img src="/images/bell.svg" style={{ width: '20px', height: '20px' }} alt="alarm" />
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <Tooltip title="여행 후기 목록">
                                            <NavLink className={`nav-link ${style.iconStyle}`} to="/ReviewList" style={({ isActive }) => isActive ? activeStyle : null}>
                                                <Icon path={mdiMessageDraw} size={1} />
                                            </NavLink>
                                        </Tooltip>
                                    </li>
                                    <li className="nav-item">
                                        <Tooltip title="관리자페이지">
                                            <NavLink className={`nav-link ${style.iconStyle}`} to="/admin" style={({ isActive }) => isActive ? activeStyle : null}>
                                                <ManageAccountsIcon />
                                            </NavLink>
                                        </Tooltip>
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
