import React from 'react';
import './accountHome.css';


export default function AccountHome() {
  return (
    <div className="account-home">
      <h1>계정</h1>
      <p>윤재 김, jay569333@gmail.com • <a href="/profile">프로필로 이동</a></p>
      <div className="account-options">
        <div className="option">
          <div className="icon">📄</div>
          <div className="details">
            <h2>개인정보</h2>
            <p>개인정보 및 연락처를 알려주세요</p>
          </div>
        </div>
        <div className="option">
          <div className="icon">🔒</div>
          <div className="details">
            <h2>로그인 및 보안</h2>
            <p>비밀번호를 변경하고 계정을 안전하게 보호하세요</p>
          </div>
        </div>
        <div className="option">
          <div className="icon">🔔</div>
          <div className="details">
            <h2>알림</h2>
            <p>알림 환경설정 및 연락 방식을 선택하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
}

