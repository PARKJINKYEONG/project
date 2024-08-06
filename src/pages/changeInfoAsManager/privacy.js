import React from 'react';

import styles from '../../css/privacy.module.css';

export default function Privacy() {
  const handleEdit = (field) => {
    // 수정 로직 추가
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.privacyContainer}>
        <h2>개인정보 수정</h2>
        <div className={styles.privacyContent}>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>실명</label>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.formControl} value="홍길동" readOnly />
              <button onClick={() => handleEdit('name')} className="btn btn-outline-primary ms-2">수정</button>
            </div>
          </div>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>이메일 주소</label>
            <div className={styles.inputGroup}>
              <input type="email" className={styles.formControl} value="example@example.com" readOnly />
              <button onClick={() => handleEdit('email')} className="btn btn-outline-primary ms-2">수정</button>
            </div>
          </div>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>전화번호</label>
            <div className={styles.inputGroup}>
              <input type="tel" className={styles.formControl} value="010-1234-5678" readOnly />
              <button onClick={() => handleEdit('phone')} className="btn btn-outline-primary ms-2">수정</button>
            </div>
          </div>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>주소</label>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.formControl} value="서울특별시 강남구" readOnly />
              <button onClick={() => handleEdit('address')} className="btn btn-outline-primary ms-2">수정</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
