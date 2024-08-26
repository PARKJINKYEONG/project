import React, { useState } from 'react';
import styles from '../../styles/progressPlan1.module.css';

export default function ProgressPlan3({ handlePlaceClick }) {
  const [activeTab, setActiveTab] = useState('locationSelect');

  return (
    <div>
      <div>
        <h6>기본 관광지 정보</h6>
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
            신규 관광지 등록
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'locationSelect' && (
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="장소명을 입력하세요"
                className={styles.customInput}
              />
              <div className={styles.buttonGroup}>
                <button className={`${styles.button} ${styles.recommendButton}`}>추천 장소</button>
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
              <p>신규 장소 등록 폼을 여기에 추가하세요.</p>
              {/* 신규 장소 등록 관련 내용 추가 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
