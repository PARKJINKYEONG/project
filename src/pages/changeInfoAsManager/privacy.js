import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

import styles from '../../styles/privacy.module.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/privacy_';

export default function Privacy() {
  const [address, setAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [userId, setUserId] = useState(''); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState({ part1: '', part2: '', part3: '' });

  const navigate = useNavigate();

  const handleEdit = (field) => {
    if (field === 'address') {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullAddress = data.roadAddress;
          let extraAddress = '';

          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if (extraAddress !== '') {
            fullAddress += ' (' + extraAddress + ')';
          }

          setAddress(fullAddress);
          setZonecode(data.zonecode);
          setExtraAddress(extraAddress);
        },
      }).open();
    }
  };

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

    if (!name && !email && !phone.part1 && !phone.part2 && !phone.part3 &&
        !address && !extraAddress && !zonecode) {
      alert('수정한 데이터가 없습니다');
      return;
    }

    alert(`${userId}님의 정보가 수정되었습니다`);
    navigate('/changeInfo');
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;

    if (!/^\d*$/.test(value)) {
      return;
    }

    if ((name === 'part1' && value.length > 3) ||
        (name === 'part2' && value.length > 4) ||
        (name === 'part3' && value.length > 4)) {
      return;
    }

    setPhone((prevPhone) => ({
      ...prevPhone,
      [name]: value,
    }));

    if (name === 'part1' && value.length === 3) {
      document.querySelector('#part2').focus();
    } else if (name === 'part2' && value.length === 4) {
      document.querySelector('#part3').focus();
    }
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

          <div className={styles.privacyItem}>
            <label className={styles.formLabel}>전화번호</label>
            <div className={styles.inputGroup}>
              <TextField id='part1' name='part1' value={phone.part1} variant="outlined" onChange={handlePhoneChange} style={{ flex: '1 1 auto', marginRight: '10px' }} />
              <TextField id='part2' name='part2' value={phone.part2} variant="outlined" onChange={handlePhoneChange} style={{ flex: '1 1 auto', marginRight: '10px' }} />
              <TextField id='part3' name='part3' value={phone.part3} variant="outlined" onChange={handlePhoneChange} style={{ flex: '1 1 auto', marginRight: '10px' }} />
            </div>
          </div>

          <InputField 
            label="주소" 
            value={address} 
            onButtonClick={() => handleEdit('address')} 
            buttonLabel="검색" 
            readOnly 
          />
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
