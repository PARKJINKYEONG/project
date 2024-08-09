import React from 'react';
import { NavLink } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import styles from '../../styles/accountHome.module.css';

export default function AccountHome() {
  return (
    <div className={`${styles.accountHome} ${styles.container}`}>
      <div className={styles.accountOptions}>
        <div className={styles.option}>
          <div className={styles.icon}><AdminPanelSettingsIcon style={{ fontSize: 50 }}/></div>
          <div className={styles.details}>
            <h2>개인정보</h2>
            <p>
              <NavLink to="/changeInfo/privacy" className={styles.editLink}>

                개인정보 수정
              </NavLink>
            </p>
          </div>
        </div>

        <div className={styles.option}>
          <div className={styles.icon}><LockIcon style={{ fontSize: 50 }}/></div>
          <div className={styles.details}>
            <h2>로그인 및 보안</h2>
            <NavLink to="/changeInfo/loginSecurity" className={styles.editLink}>

                비밀번호 변경
              </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
