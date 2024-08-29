import React, { useState } from 'react';
import styles from '../../styles/progressPlan3.module.css';

export default function ProgressPlan3({ handlePlaceClick }) {
  const [activeTab, setActiveTab] = useState('locationSelect');

  return (
    <div>
      <div>
        <h6>선택 여행 장소</h6>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'locationSelect' ? styles.active : ''}`}
            onClick={() => setActiveTab('locationSelect')}
          >
            숙소 선택
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'newLocation' ? styles.active : ''}`}
            onClick={() => setActiveTab('newLocation')}
          >
            신규 숙소 등록
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'locationSelect' && (
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="숙소명을 입력하세요"
                className={styles.customInput}
              />
              <div className={styles.buttonGroup}>
                <button className={`${styles.button} ${styles.recommendButton}`}>추천 숙소</button>
              </div>
              <ul className={styles.placeList}>
                  <li className={styles.placeItem} onClick={() => handlePlaceClick()}>
                    <div>
                      <strong></strong>
                      <p></p>
                    </div>
                    <button className={styles.addButton}>+</button>
                  </li>
              </ul>
              {/* 장소 선택 관련 내용 추가 */}
            </div>
          )}
          {activeTab === 'newLocation' && (
            <div>
              <input
                type="text"
                placeholder="장소명을 입력하세요"
                className={styles.customInput}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
