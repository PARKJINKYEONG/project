import React from 'react';
import styles from '../../styles/descriptionPlan.module.css';

const destinations = [
  {
    id: 1,
    name: 'OSAKA',
    country: '일본 오사카',
    imageUrl: 'https://example.com/osaka.jpg',
    isNew: true
  },
  {
    id: 2,
    name: 'TOKYO',
    country: '일본 도쿄',
    imageUrl: 'https://example.com/tokyo.jpg',
    isNew: true
  },
  {
    id: 3,
    name: 'FUKUOKA',
    country: '일본 후쿠오카',
    imageUrl: 'https://example.com/fukuoka.jpg',
    isNew: true
  },
  {
    id: 4,
    name: 'JEJU',
    country: '대한민국 제주',
    imageUrl: 'https://example.com/jeju.jpg',
    isNew: true
  },
];

export default function DescriptionPlan() {
  return (
    <div className={styles.container}>
      <h2>어디로 여행을 떠나시나요?</h2>
      <input type="text" placeholder="국가명이나 도시명으로 검색해보세요." className={styles.searchInput} />
      
      <div className={styles.tabs}>
        <button className={styles.tab}>전체</button>
        <button className={styles.tab}>국내</button>
        <button className={styles.tab}>해외</button>
      </div>

      <div className={styles.cardContainer}>
        {destinations.map(dest => (
          <div key={dest.id} className={styles.card}>
            <img src={dest.imageUrl} alt={dest.name} className={styles.cardImage} />
            {dest.isNew && <span className={styles.newLabel}>NEW</span>}
            <div className={styles.cardContent}>
              <h3>{dest.name}</h3>
              <p>{dest.country}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
