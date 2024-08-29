import React, { useState } from 'react';
import styles from '../../styles/progressPlan2.module.css';

export default function ProgressPlan2({ handlePlaceClick }) {
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
            관광지 선택
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
                <button className={`${styles.button} ${styles.recommendButton}`}>축제</button>
                <button className={`${styles.button} ${styles.recommendButton}`}>명소</button>
                <button className={`${styles.button} ${styles.recommendButton}`}>식당</button>
                <button className={`${styles.button} ${styles.recommendButton}`}>카페</button>
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
