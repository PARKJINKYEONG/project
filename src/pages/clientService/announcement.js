import React from 'react';
import QnAstyle from '../../styles/announcement.module.css';

function Announcement() {
  return <>
    <div className="announcement-container">
      <img src="/images/Mask_group.png" alt="Header" className="header-image" />
      <div className="announcement-tabs">
        <button className="tab-button">전체</button>
        <button className="tab-button">공지사항</button>
        <button className="tab-button">고객센터</button>
        <input type="text" className="search-input" placeholder="검색" />
        <button className="search-button">검색</button>
      </div>
      <div className="announcement-content">
        <h2>공지사항</h2>
        <table className="announcement-table">
          <thead>
            <tr>
              <th>전체</th>
              <th>서비스 점검</th>
              <th>업데이트</th>
              <th>이용안내</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">내용이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
};

export default Announcement;
