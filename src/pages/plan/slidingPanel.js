import React from 'react';
import styles from '../../styles/slidingPanel.module.css';
import DetailPlanComponent from './detailPlanComponent'; // DetailPlanComponent 가져오기

function SlidingPanel({ isOpen, onClose, selectedPlaces, onRemovePlace }) {
  return (
    <div className={isOpen ? styles.panel : `${styles.panel} ${styles.hidden}`}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      <div>
        <h3>선택된 장소</h3>
        <div>
          {selectedPlaces.length === 0 ? (
            <p>선택된 장소가 없습니다.</p>
          ) : (
            selectedPlaces.map((place, index) => (
              <div key={index} className={styles.placeItem}>
                {/* DetailPlanComponent로 각 장소를 렌더링, 슬라이드 패널이면 isSlidePanel=true 전달 */}
                <DetailPlanComponent
                  selectedCategory={place.category || ""}
                  imageUrl={place.isHasImage ? 'https://via.placeholder.com/150' : null}
                  placeName={place.eventName || place.name}
                  address={place.address}
                  startDate={place.eventStartDate}
                  endDate={place.eventEndDate}
                  onRemovePlace={() => onRemovePlace(place)} // X 버튼을 눌렀을 때 삭제
                  isSlidePanel={true} // 슬라이드 패널에서는 X 버튼
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SlidingPanel;
