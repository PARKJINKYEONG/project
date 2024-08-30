import React, { useContext, useState } from 'react';
import styles from '../styles/user/Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import SignOutButton from './member/signout';
import { UserContext } from '../contexts/userContext';
import { Badge, IconButton } from '@mui/material';
import { Alarm } from '@mui/icons-material';

const NewHeader = () => {

  const { accessToken, email } = useContext(UserContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const activeStyle = { fontWeight: 'normal' };
  const [alarmCount, setAlarmCount] = useState(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setMenuVisible(false);
  };

  const toggleDropdown = () => {        
    setIsDropdownVisible(prev => !prev);
};

  return (
    <div className={`${styles.headerContainer} nanumsqr-korfont`} onMouseLeave={handleMouseLeave}>
      <header className={styles.header} onMouseEnter={handleMouseEnter}>
        <div className={`${styles.logoContainer}`}>
          <Link className={`navbar-brand d-flex align-items-center `} to="/">
            <img src="/images/sample_logo.png" style={{ width: '50px', height: '50px' }} alt="logo" />
            <span className={styles.logoText}>
              <img src="/images/travelJoyLogo.png" style={{ height: '50px' }} alt="TravelJoy" />
            </span>
          </Link>
        </div>
        <nav className={`text-start ${styles.nav}`}>
          <div className={`${styles.navItem}`}>
            여행 계획
          </div>
          <div className={`${styles.navItem}`}>
            여행 정보
          </div>
          <div className={`${styles.navItem}`}>
            공지사항
          </div>
        </nav>
        {!!accessToken ? ( 
          <>
            <div className="nav-item">
              <NavLink className={`nav-link`} to="/mypage">
                <img src="/images/person-circle.svg" style={{ width: '20px', height: '20px' }} alt="profile" />
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className={`nav-link`} to="/admin2">
                <img src="/images/icons/gear-fill.svg" style={{ width: '20px', height: '20px' }} alt="profile" />
              </NavLink>
            </div>
            <div className="nav-item">
            <NavLink to={'/alarmDetail'} className={`nav-link`} onClick={toggleDropdown}
            style={({ isActive }) => isActive ? activeStyle : null} >
                <Badge badgeContent={alarmCount} color="error">
                <img src="/images/bell.svg" style={{ width: '20px', height: '20px' }} alt="alarm" />
                </Badge>        
            </NavLink>
            </div>

            <div className="nav-item">
              <SignOutButton />
            </div>
          </>
        ) : (
          <div className={`text-end ${styles.auth}`}>
            <NavLink className={`${styles.authLink}`} to="/user/signin"> Sign In </NavLink>
            <NavLink className={`${styles.authLink}`} to="/user/signup"> Sign Up </NavLink>
          </div>
        )}
      </header>
      <div className={` ${styles.menuBar} ${menuVisible ? styles.menuBarVisible : ''}`} >
        <div className={`${styles.menuItemBlank}`}></div>
        <div className={styles.menuItemContainer}>
          <div className={`${styles.menuItem}`}>
            <NavLink className={`${styles.submenuLink}`} to="/createPlan">여행 계획하기</NavLink>
            <NavLink className={`${styles.submenuLink}`} to="/ReviewList">여행 후기</NavLink>
          </div>
          <div className={`${styles.menuItem}`}>
            <NavLink className={`${styles.submenuLink}`} to="/place/global">해외 여행</NavLink>
            <NavLink className={`${styles.submenuLink}`} to="/place/local">국내 여행</NavLink>
            <NavLink className={`${styles.submenuLink}`} to="/place/flightSearch">항공 정보</NavLink>
            <NavLink className={`${styles.submenuLink}`} to="/place/weatherSearch">날씨 정보</NavLink>
            <NavLink className={`${styles.submenuLink}`} to="/place/hotelSearch">숙박 정보</NavLink>
          </div>
          
          <div className={`${styles.menuItem}`}>
            <NavLink className={`${styles.submenuLink}`} to="/announcement">공지사항</NavLink>
            <NavLink className={`${styles.submenuLink}`} to="/userQna">Q&A</NavLink>
            <NavLink className={`${styles.submenuLink}`} to="/userFaq">FAQ</NavLink>
          </div>
          <div className={`${styles.menuItem}`}>
            
          </div>
        </div>
        <div className={`${styles.menuItemBlank}`}></div>
      </div>
    </div>
  );
};

export default NewHeader;