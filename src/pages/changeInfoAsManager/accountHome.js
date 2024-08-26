import React from 'react';

import LockIcon from '@mui/icons-material/Lock';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BlockIcon from '@mui/icons-material/Block';

import styles from '../../styles/accountHome.module.css';

import AccountOption from '../../components/accountHome_';

export default function AccountHome() {
  return (
    <div className={`${styles.accountHome} ${styles.container}`}>
      <div className={styles.accountOptions}>
        <AccountOption icon={AdminPanelSettingsIcon} title="개인정보"
          link="/changeInfo/privacy" linkText="개인정보 수정"/>
        <AccountOption icon={LockIcon} title="로그인 및 보안"
          link="/changeInfo/loginSecurity" linkText="비밀번호 변경"/>
        <AccountOption icon={BlockIcon} title="계정 제한 및 정지"
          link="/changeInfo/accountLock" linkText="계정 제한"/>
      </div>
    </div>
  );
}
