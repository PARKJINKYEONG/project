import React, { useState } from 'react';
import styles from '../styles/user/Header.module.css';

const NewHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setMenuVisible(false);
  };

  return (
    <div className={styles.headerContainer} onMouseLeave={handleMouseLeave}>
      <header className={styles.header} onMouseEnter={handleMouseEnter}>
        <div className={styles.logoContainer}>
          <img src="/images/sample_logo.png" alt="TravelJoy" className={styles.logo} />
          <span className={styles.logoText}>
            <img src="/images/travelJoyLogo.png" height={56} alt="TravelJoy" />
          </span>
        </div>
        <nav className={styles.nav}>
          <div className={styles.navItem}>
            여행 계획
            <div className={styles.subMenu}>
              <a href="#">계획 1</a>
              <a href="#">계획 2</a>
              <a href="#">계획 3</a>
            </div>
          </div>
          <div className={styles.navItem}>
            여행 정보
            <div className={styles.subMenu}>
              <a href="#">정보 1</a>
              <a href="#">정보 2</a>
              <a href="#">정보 3</a>
            </div>
          </div>
          <div className={styles.navItem}>
            공지사항
            <div className={styles.subMenu}>
              <a href="#">공지 1</a>
              <a href="#">공지 2</a>
              <a href="#">공지 3</a>
            </div>
          </div>
          <div className={styles.navItem}>
            후기
            <div className={styles.subMenu}>
              <a href="#">후기 1</a>
              <a href="#">후기 2</a>
              <a href="#">후기 3</a>
            </div>
          </div>
        </nav>
        <div className={styles.auth}>
          <a href="#" className={styles.authLink}>Sign In</a>
          <a href="#" className={styles.authLink}>Sign Up</a>
        </div>
      </header>
      <div
        className={`${styles.menuBar} ${menuVisible ? styles.menuBarVisible : ''}`}
      >
        <div className={styles.menuItem}>
          여행 계획
          <div className={styles.subMenu}>
            <a href="#">계획 1</a>
            <a href="#">계획 2</a>
            <a href="#">계획 3</a>
          </div>
        </div>
        <div className={styles.menuItem}>
          여행 정보
          <div className={styles.subMenu}>
            <a href="#">정보 1</a>
            <a href="#">정보 2</a>
            <a href="#">정보 3</a>
          </div>
        </div>
        <div className={styles.menuItem}>
          공지사항
          <div className={styles.subMenu}>
            <a href="#">공지 1</a>
            <a href="#">공지 2</a>
            <a href="#">공지 3</a>
          </div>
        </div>
        <div className={styles.menuItem}>
          후기
          <div className={styles.subMenu}>
            <a href="#">후기 1</a>
            <a href="#">후기 2</a>
            <a href="#">후기 3</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHeader;