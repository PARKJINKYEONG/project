import React, { useState } from 'react';


import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/changeInfo.module.css';
import InputField from '../../components/inputField';





export default function LoginSecurity() {
  const [oldId, setOldId] = useState('');
  const [newId, setNewId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();


  const handleEdit = (field) => {
    // 수정 로직 추가
  };

  const searchId = (id) => {
    // 검색 로직 추가
  };

  const handleEditComplete = () => {

    if (!oldId) {

      alert('변경 할 아이디를 입력하세요');
      return;
    }


    if (!newId && !newPassword) {
      alert('변경 사항이 없습니다');
      return;
    }

    if (oldId === newId) {
      alert('수정한 아이디가 이전 아이디와 같습니다');
      return;
    }

    if (newPassword) { // newPassword가 비어있지 않은 경우에만 내부 코드를 실행
      if (oldPassword === newPassword) {
        alert('수정한 비밀번호가 이전 비밀번호와 같습니다');

        return;
      }
    }


    if (oldPassword === '' && newPassword !== '') {
      alert('변경 전 비밀번호를 입력하세요');
      return;
    }

    alert(`${oldId}님의 정보가 변경되었습니다`);
    navigate('/changeInfo');

    // 추가 로직을 여기에 추가
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.privacyContainer}>
        <h2>아이디/비밀번호 수정</h2>
        <div className={styles.privacyContent}>

          <InputField label="변경 할 아이디" value={oldId} onChange={(e) => setOldId(e.target.value)}/>
          <Button variant="outlined"onClick={() => searchId(oldId)} className={`ms-2 ${styles.searchButton}`}
            style={{ width: '80px' }} >
            검색
          </Button>
          <InputField label="변경 후 아이디"value={newId}onChange={(e) => setNewId(e.target.value)}/>
          <InputField label="변경 전 비밀번호" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password"/>
          <Button variant="outlined" onClick={() => handleEdit('password')}
            className="ms-2" style={{ width: '80px' }}>
            인증
          </Button>
          <InputField label="변경 후 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password"/>
        </div>
        <div className={styles.editCompleteContainer}>
          <Button variant="contained" color="primary" onClick={handleEditComplete}>수정완료</Button>
        </div>
      </div>
    </div>
  );
}
