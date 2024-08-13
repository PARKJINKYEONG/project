import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/changeInfo.module.css';
import InputField from '../../components/inputField';
import AddressSearch from '../../components/addressSearch';
import PhoneInput from '../../components/phoneInput';

export default function MemberInfoEdit() {
  const [newId, setNewId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState({ part1: '', part2: '', part3: '' });
  const [address, setAddress] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [extraAddress, setExtraAddress] = useState('');

  const navigate = useNavigate();

  const handleEditComplete = () => {
    if (!newId && !newPassword && !name && !phone.part1 && !phone.part2 && !phone.part3 && !address && !extraAddress && !zonecode) {
      alert('수정한 내용이 없습니다.');
      return;
    }

    const idRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@!#$%^&*()_+~=\-]{8,}$/;
    if (newId && !idRegex.test(newId)) {
      alert('아이디는 8글자 이상이어야 하며, 영문자와 숫자가 포함되어야 합니다.');
      return;
    }

    if(newPassword && !idRegex.test(newPassword)){
      alert('비밀번호는 8글자 이상이어야 하며, 영문자와 숫자가 포함되어야 합니다.');
      return;
    }

    if(newPassword){
      if(!oldPassword){
        alert('현재 비밀번호를 입력하세요');
        return;
      }
    }

    if (newPassword && oldPassword === newPassword) {
      alert('새 비밀번호가 이전 비밀번호와 동일합니다.');
      return;
    }

    alert(`~~님의 정보가 수정되었습니다.`);
    navigate('/changeInfo');
  };

  const handleAddressSelect = (data) => {
    setAddress(data.fullAddress);
    setZonecode(data.zonecode);
    setExtraAddress(data.extraAddress);
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.privacyContainer}>
        <h2>회원 정보 수정</h2>
        <div className={styles.privacyContent}>
          <InputField label="새 아이디" value={newId} onChange={(e) => setNewId(e.target.value)} />
          <InputField label="현재 비밀번호" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" />
          <InputField label="새 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" />
          <InputField label="실명 변경" value={name} onChange={(e) => setName(e.target.value)} />
          
          <PhoneInput phone={phone} setPhone={setPhone} />

          <InputField label="주소 변경" value={address} readOnly />
          <AddressSearch onAddressSelect={handleAddressSelect} />
          <InputField label="우편번호" value={zonecode} readOnly />
          {extraAddress && (
            <InputField label="추가 주소" value={extraAddress} onChange={(e) => setExtraAddress(e.target.value)} />
          )}
        </div>
        <div className={styles.editCompleteContainer}>
          <Button variant="contained" color="primary" onClick={handleEditComplete}>수정 완료</Button>
        </div>
      </div>
    </div>
  );
}
