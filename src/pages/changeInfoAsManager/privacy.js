import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from '../../styles/changeInfo.module.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/inputField';
import AddressSearch from '../../components/addressSearch';
import PhoneInput from '../../components/phoneInput';

export default function Privacy() {
  const [address, setAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [userId, setUserId] = useState(''); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState({ part1: '', part2: '', part3: '' });

  const navigate = useNavigate();

  const searchId = (id) => {
    // 검색 로직 추가
  };

  const handleExtraAddressChange = (e) => {
    setExtraAddress(e.target.value);
  };

  const handleEditComplete = () => {
    if (!userId) {
      alert('수정할 아이디를 입력하세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
    alert('이메일 형식이 틀렸습니다.');
    return;
    }

    if (!name && !email && !phone.part1 && !phone.part2 && !phone.part3 &&
        !address && !extraAddress && !zonecode) {
      alert('수정한 데이터가 없습니다');
      return;
    }

    alert(`${userId}님의 정보가 수정되었습니다`);
   
  };

  const handleAddressSelect = (data) => {
    setAddress(data.fullAddress);
    setZonecode(data.zonecode);
    setExtraAddress(data.extraAddress);
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.privacyContainer}>
        <h2>개인정보 수정</h2>

        <InputField 
          label="수정할 아이디" 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          buttonLabel="검색"
          onButtonClick={() => searchId(userId)} 
        />

        <div className={styles.privacyContent}>
          <InputField label="실명" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} />
          <PhoneInput phone={phone} setPhone={setPhone} />
          <InputField label="주소" value={address} readOnly />
          <AddressSearch onAddressSelect={handleAddressSelect} />
          <InputField label="우편번호" value={zonecode} readOnly />
          {extraAddress && (
            <InputField label="추가 주소" value={extraAddress} onChange={handleExtraAddressChange} />
          )}
        </div>

        <div className={styles.editCompleteContainer}>
          <Button variant="contained" color="primary" onClick={handleEditComplete}>입력완료</Button>
        </div>
      </div>
    </div>
  );
}
