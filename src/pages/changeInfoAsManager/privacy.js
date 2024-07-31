import React from 'react';
import './privacy.css';  
export default function Privacy() {
  const handleEdit = (field) => {
    
  };

  return (
    <div className="privacy-container">
      <h2>개인정보 수정</h2>
      <div className="privacy-content">
        <div className="privacy-item">
          <label className="form-label">실명</label>
          <div className="input-group">
            <input type="text" className="form-control" value="홍길동" readOnly />
            <button onClick={() => handleEdit('name')} className="btn btn-outline-primary ms-2">수정</button>
          </div>
        </div>
        <div className="privacy-item">
          <label className="form-label">이메일 주소</label>
          <div className="input-group">
            <input type="email" className="form-control" value="example@example.com" readOnly />
            <button onClick={() => handleEdit('email')} className="btn btn-outline-primary ms-2">수정</button>
          </div>
        </div>
        <div className="privacy-item">
          <label className="form-label">전화번호</label>
          <div className="input-group">
            <input type="tel" className="form-control" value="010-1234-5678" readOnly />
            <button onClick={() => handleEdit('phone')} className="btn btn-outline-primary ms-2">수정</button>
          </div>
        </div>
        <div className="privacy-item">
          <label className="form-label">주소</label>
          <div className="input-group">
            <input type="text" className="form-control" value="서울특별시 강남구" readOnly />
            <button onClick={() => handleEdit('address')} className="btn btn-outline-primary ms-2">수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}
