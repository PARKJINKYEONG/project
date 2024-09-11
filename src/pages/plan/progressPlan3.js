import React, { useState } from 'react';
import styles from '../../styles/progressPlan3.module.css';

const ProgressPlan2 = () => {
  const [selectedTab, setSelectedTab] = useState('선택된 숙소');
  const [selectedCategory, setSelectedCategory] = useState('숙소');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>머물고 싶은 곳을 선택해주세요</h6>

      <div className={styles.tabButtons}>
        <button
          className={selectedTab === '선택된 숙소' ? styles.active : styles.button}
          onClick={() => handleTabChange('선택된 숙소')}
        >
          선택된 숙소
        </button>
        <button
          className={selectedTab === '숙소 검색 및 추천' ? styles.active : styles.button}
          onClick={() => handleTabChange('숙소 검색 및 추천')}
        >
          숙소 검색 및 추천
        </button>
      </div>

      {selectedTab === '선택된 숙소' ? (
        <div>
          <div className={styles.categoryButtons}>
            <button
              className={selectedCategory === '숙소' ? styles.activeCategory : styles.button}
              onClick={() => handleCategoryChange('숙소')}
            >
              추천 숙소
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
            <div id="kakaoMap" className={styles.map}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPlan2;
