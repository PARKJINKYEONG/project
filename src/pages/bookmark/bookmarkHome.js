import React from 'react';
import { useNavigate } from 'react-router-dom';
import './bookmarkHome.css';

export default function BookmarkHome() {
  const navigate = useNavigate();

  const handleItemClick = (url) => {
    navigate(url); 
  };

  return (
    <div className="bookmark-home">
      <div className="content">
        <h2 className="title">즐겨찾기</h2>
        <div className="bookmark-list">
          <div className="bookmark-item" onClick={() => handleItemClick('/bookmark/recently-viewed')} style={{ cursor: 'pointer' }}>
            <div className="bookmark-image-grid">
              <img src="image1.jpg" alt="item1" className="grid-image" />
              <img src="image2.jpg" alt="item2" className="grid-image" />
              <img src="image3.jpg" alt="item3" className="grid-image" />
              <img src="image4.jpg" alt="item4" className="grid-image" />
            </div>
            <div className="recently-viewed">
              <h3>최근 조회</h3>
            </div>
          </div>
          <div className="bookmark-item2" onClick={() => handleItemClick('/bookmark/details')} style={{ cursor: 'pointer' }}>
            <img src="image5.jpg" alt="item5" className="single-image" />
            <div className="bookmark-name">
              <h3>즐겨찾기 이름</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
