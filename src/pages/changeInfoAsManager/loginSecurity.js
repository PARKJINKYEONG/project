
import React from 'react';
import styles from '../../css/loginSecurity.module.css';

export default function LoginSecurity() {
  const handleEdit = (field) => {
    // 수정 로직 추가
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.privacyContainer}>
        <h2>아이디/비밀번호 수정</h2>
        <div className={styles.privacyContent}>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>변경 전 아이디</label>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.formControl} value="111@naver.com" readOnly />
            </div>
          </div>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>변경 후 아이디</label>
            <div className={styles.inputGroup}>
              <input type="email" className={styles.formControl} value="example@example.com" readOnly />
              <button onClick={() => handleEdit('email')} className="btn btn-outline-primary">수정</button>
            </div>
          </div>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>변경 전 비밀번호</label>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.formControl} value="12345678" readOnly />
            </div>
          </div>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>변경 후 비밀번호</label>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.formControl} value="87654321" readOnly />
              <button onClick={() => handleEdit('password')} className="btn btn-outline-primary">수정</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

