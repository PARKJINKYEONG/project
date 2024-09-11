import React, { useState } from 'react';
import styles from '../../styles/progressPlan2.module.css';
import MapComponent from './mapComponent';

const ProgressPlan2 = () => {
  const [selectedTab, setSelectedTab] = useState('선택된 관광지');
  const [selectedCategory, setSelectedCategory] = useState('축제'); // '축제', '명소', '쇼핑', '유적'

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>가보고 싶은 곳을 선택해주세요</h6>

      <div className={styles.tabButtons}>
        <button
          className={selectedTab === '선택된 관광지' ? styles.active : styles.button}
          onClick={() => handleTabChange('선택된 관광지')}
        >
          선택된 관광지
        </button>
        <button
          className={selectedTab === '관광지 검색 및 추천' ? styles.active : styles.button}
          onClick={() => handleTabChange('관광지 검색 및 추천')}
        >
          관광지 검색 및 추천
        </button>
      </div>

      {selectedTab === '선택된 관광지' ? (
        <div>
          <div className={styles.categoryButtons}>
            <button
              className={selectedCategory === '축제' ? styles.activeCategory : styles.button}
              onClick={() => handleCategoryChange('축제')}
            >
              축제
            </button>
            <button
              className={selectedCategory === '명소' ? styles.activeCategory : styles.button}
              onClick={() => handleCategoryChange('명소')}
            >
              명소
            </button>
            <button
              className={selectedCategory === '쇼핑' ? styles.activeCategory : styles.button}
              onClick={() => handleCategoryChange('쇼핑')}
            >
              쇼핑
            </button>
            <button
              className={selectedCategory === '유적' ? styles.activeCategory : styles.button}
              onClick={() => handleCategoryChange('유적')}
            >
              유적
            </button>
          </div>

          <div className={styles.selectedTouristSpot}>
            <img
              src="https://via.placeholder.com/150"
              alt={selectedCategory}
              className={styles.spotImage}
            />
            <div className={styles.cardContent}>
              <h4 className={styles.spotTitle}>{selectedCategory} 이름</h4>
              <p className={styles.spotInfo}>연락처, 서울특별시, 강남구...</p>
              <p className={styles.spotTime}>00:00 - 00:00</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.recommendation}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="관광지를 검색하세요"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>검색</button>
          </div>

          {/* KakaoMap이 표시될 위치 */}
          <div className={styles.mapContainer}>
            <MapComponent/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPlan2;
