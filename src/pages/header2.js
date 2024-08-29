import React, { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import style from "../styles/Header.module.css";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Tooltip, IconButton } from "@mui/material";
import { UserContext } from '../contexts/userContext';
import SignOutButton from './member/signout';

export default function Header2() {
    const { accessToken } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null); // 활성화된 주메뉴 상태
    // 주메뉴 또는 부메뉴에 마우스가 올려졌을 때 메뉴 열림
    const handleMouseEnter = (menu) => {
        setIsMenuOpen(true);
        setActiveMenu(menu); // 현재 활성화된 주메뉴 설정
    };
    // 부메뉴를 포함한 전체 메뉴에서 마우스가 벗어났을 때 메뉴 닫힘
    const handleMouseLeave = () => {
        setIsMenuOpen(false);
        setActiveMenu(null); // 활성화된 주메뉴 초기화
    };
    return (
        <>
            <nav
                className="navbar navbar-expand-md fixed-top style.header roboto-condensed-engfont"
                id="bg-color"
            >
                <div className="container-fluid d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <Link className="navbar-brand d-flex align-items-center" to="/">
                            <Tooltip title="홈화면">
                                <img src="/images/sample_logo.png" className={style.logoStyle} style={{ width: '50px', height: '50px' }} alt="logo" />
                            </Tooltip>
                            <span className={style.headerTitle} style={{ marginLeft: '10px' }}>Travel Joy</span>
                        </Link>
                    </div>
                    <div className="d-flex ms-3 align-items-center">
                        <ul className="navbar-nav d-flex flex-row">
                            <li
                                className={`nav-item position-relative me-4 ${activeMenu === 'plan' ? 'active' : ''}`}
                                onMouseEnter={() => handleMouseEnter('plan')} // 주메뉴 또는 부메뉴에 마우스가 올려지면 메뉴 열림
                            >
                                <span className={`nav-link ${style.iconStyle}`}>여행 계획</span>
                                {activeMenu === 'plan' && <span className="dot-icon">•</span>} {/* 점 아이콘 표시 */}
                            </li>
                            <li
                                className={`nav-item position-relative me-4 ${activeMenu === 'tripinfo' ? 'active' : ''}`}
                                onMouseEnter={() => handleMouseEnter('tripinfo')}
                            >
                                <span className={`nav-link ${style.iconStyle}`}>여행 정보</span>
                                {activeMenu === 'tripinfo' && <span className="dot-icon">•</span>}
                            </li>
                            <li
                                className={`nav-item position-relative me-4 ${activeMenu === 'qna' ? 'active' : ''}`}
                                onMouseEnter={() => handleMouseEnter('qna')}
                            >
                                <span className={`nav-link ${style.iconStyle}`}>공지사항</span>
                                {activeMenu === 'qna' && <span className="dot-icon">•</span>}
                            </li>
                            <li
                                className={`nav-item position-relative ${activeMenu === 'review' ? 'active' : ''}`}
                                onMouseEnter={() => handleMouseEnter('review')}
                            >
                                <span className={`nav-link ${style.iconStyle}`}>후기</span>
                                {activeMenu === 'review' && <span className="dot-icon">•</span>}
                            </li>
                        </ul>
                    </div>
                    <div className="ms-auto">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mynavbar">
                            <ul className="navbar-nav ms-auto">
                                {!!!accessToken ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className={`nav-link ${style.iconStyle}`} to="/">
                                                <img src="/images/bell.svg" style={{ width: '20px', height: '20px' }} alt="alarm" />
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <Tooltip title="마이페이지">
                                                <IconButton className={style.iconStyle}>
                                                    <img src="/images/person-circle.svg" style={{ width: '20px', height: '20px' }} alt="profile" />
                                                </IconButton>
                                            </Tooltip>
                                        </li>
                                        <li className="nav-item">
                                            <Tooltip title="관리자페이지">
                                                <NavLink className={`nav-link ${style.iconStyle}`} to="/admin">
                                                    <ManageAccountsIcon />
                                                </NavLink>
                                            </Tooltip>
                                        </li>
                                        <li className="nav-item">
                                            <SignOutButton />
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Tooltip title="로그인">
                                                <NavLink className={`nav-link ${style.iconStyle}`} to="/user/signin">Sign In</NavLink>
                                            </Tooltip>
                                        </li>
                                        <li className="nav-item">
                                            <Tooltip title="회원가입">
                                                <NavLink className={`nav-link ${style.iconStyle}`} to="/user/signup">Sign Up</NavLink>
                                            </Tooltip>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="overlay">
                    <div className="submenu-container" onMouseLeave={handleMouseLeave}>
                        <div
                            className="submenu submenu-plan"
                            onMouseEnter={() => handleMouseEnter('plan')} // 부메뉴에 마우스가 올려지면 해당 주메뉴 활성화 유지
                        >
                            <NavLink className="submenu-link" to="/createPlan">계획</NavLink>
                        </div>
                        <div
                            className="submenu submenu-tripinfo"
                            onMouseEnter={() => handleMouseEnter('tripinfo')}
                        >
                            <NavLink className="submenu-link" to="/place/global">국외 여행</NavLink>
                            <NavLink className="submenu-link" to="/place/local">국내 여행</NavLink>
                            <NavLink className="submenu-link" to="/place/lodgment">숙박 시설</NavLink>
                        </div>
                        <div
                            className="submenu submenu-qna"
                            onMouseEnter={() => handleMouseEnter('qna')}
                        >
                            <NavLink className="submenu-link" to="/userQna">Q&A</NavLink>
                            <NavLink className="submenu-link" to="/userFaq">FAQ</NavLink>
                            <NavLink className="submenu-link" to="/eCrm">신고관리</NavLink>
                        </div>
                        <div
                            className="submenu submenu-review"
                            onMouseEnter={() => handleMouseEnter('review')}
                        >
                            <NavLink className="submenu-link" to="/ReviewList">후기</NavLink>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
                .navbar {
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    gap: 130px; /* 주메뉴 사이 간격을 30px 더 넓힘 */
                    background-color: white;
                }
                .overlay {
                    position: absolute;
                    top: 60px;
                    left: 0;
                    width: 100%;
                    height: 130px;
                    background-color: white;
                    z-index: 9;
                    display: flex;
                    justify-content: center;
                    align-items: start;
                    padding-top: 10px;
                }
                .submenu-container {
                    display: flex;
                    width: 100%;
                    gap: 120px;
                }
                .submenu {
                    text-align: center;
                }
                .submenu-plan {
                    transform: translateX(220px);
                }
                .submenu-tripinfo {
                    transform: translateX(130px);
                }
                .submenu-qna {
                    transform: translateX(30px);
                }
                .submenu-review {
                    transform: translateX(-70px);
                }
                .submenu-link {
                    display: block;
                    padding: 8px 16px;
                    text-decoration: none;
                    color: black;
                    font-size: 14px;
                }
                .submenu-link:hover {
                    background-color: #F0F0F0;
                }
                .nav-item.active .nav-link {
                    position: relative;
                }
                .dot-icon {
                    position: absolute;
                    right: -10px;
                    top: 0;
                    color: black;
                    font-size: 18px;
                }
            `}</style>
        </>
    );
}