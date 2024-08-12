import React, { useState } from 'react';

import styles from '../../styles/accountLock.module.css';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RadioGroupSection from '../../components/accountLock_';


export default function AccountLock() {
  const [reason, setReason] = useState(''); 
  const [otherReason, setOtherReason] = useState(''); 
  const [period, setPeriod] = useState('');
  const [accountId, setAccountId] = useState('');

  const navigate = useNavigate();

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleLockAccount = () => {
    if (!accountId) {
      alert('제한 할 아이디를 입력하세요');
      return;
    }
    if (!period) {
      alert('제한 기간을 선택하세요');
      return;
    }
    if (!reason) {
      alert('제한 사유를 선택하세요');
      return;
    }
    if (reason === '기타' && !otherReason) {
      alert('기타 사유를 입력하세요');
      return;
    }
    alert(`${accountId}님이 ${period} 정지되었습니다`);
    navigate('/changeInfo');
  };

  const searchId = (id) => {
    // 검색 로직 추가
  };

  const periodOptions = [
    { value: '일주일', label: '일주일' },
    { value: '한달', label: '한달' },
    { value: '6개월', label: '6개월' },
    { value: '영구', label: '영구정지' },
  ];

  const reasonOptions = [
    { value: '욕설', label: '욕설' },
    { value: '계정도용', label: '계정도용' },
    { value: '불법광고', label: '불법광고' },
    { value: '기타', label: '기타' },
  ];

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.privacyContainer}>
        <h2>계정 제한/정지</h2>
        <div className={styles.privacyContent}>
          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>제한 할 아이디</label>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                className={styles.formControl} 
                value={accountId} 
                onChange={(e) => setAccountId(e.target.value)}
              />
              <button onClick={() => searchId(accountId)} className="btn btn-outline-primary">검색</button>
            </div>
          </div>

          <RadioGroupSection
            title="제한 기간"
            options={periodOptions}
            value={period}
            onChange={handlePeriodChange}
          />

          <RadioGroupSection
            title="제한 사유"
            options={reasonOptions}
            value={reason}
            onChange={handleReasonChange}
            otherReason={otherReason}
            onOtherReasonChange={handleOtherReasonChange}
          />
        </div>
      </div>
      <div className={styles.lockButtonContainer}>
        <Button variant="contained" color="error" onClick={handleLockAccount}>
          계정 제한
        </Button>
      </div>
    </div>
  );
}
