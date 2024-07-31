import React from 'react';
import { NavLink } from 'react-router-dom';
import './accountHome.css';  

export default function AccountHome() {
  return (
    <div className="account-home">
      <div className="account-options">
        <div className="option">
          <div className="icon">📄</div>
          <div className="details">
            <h2>개인정보</h2>
            <p>
              <NavLink to="/changeInfo/privacy" className="edit-link">
                개인정보 수정
              </NavLink>
            </p>
          </div>
        </div>
        <div className="option">
          <div className="icon">🔒</div>
          <div className="details">
            <h2>로그인 및 보안</h2>
            <NavLink to="/changeInfo/loginSecurity" className="edit-link">
                비밀번호 변경
              </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
