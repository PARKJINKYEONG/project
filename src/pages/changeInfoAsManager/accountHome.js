import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../../css/accountHome.module.css';

export default function AccountHome() {
  return (
    <div className={`${styles.accountHome} ${styles.container}`}>
      <div className={styles.accountOptions}>
        <div className={styles.option}>
          <div className={styles.icon}>📄</div>
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
          <div className={styles.icon}>🔒</div>
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
