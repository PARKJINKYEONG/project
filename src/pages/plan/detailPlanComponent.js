import styles from '../../styles/plan/createPlan/detailPlanComponent.module.css';

const DetailPlanComponent = ({ selectedCategory, imageUrl, placeName, address, startDate, endDate, onAddPlace, onRemovePlace, isSlidePanel }) => {
    return (
        <div className={styles.selectedTouristSpot}>
            <img
              src={imageUrl}
              alt={selectedCategory}
              className={styles.tabButton}
            />
            <div className={styles.cardContent}>
              <h4 className={styles.spotTitle}>{selectedCategory} {placeName}</h4>
              <p className={styles.spotInfo}>{address}</p>
              <p className={styles.spotTime}>{startDate} - {endDate}</p>
            </div>
            {/* 슬라이드 패널인 경우 X 버튼, 아닌 경우 + 버튼 */}
            {isSlidePanel ? (
              <button className={styles.removeButton} onClick={onRemovePlace}>X</button>
            ) : (
              <button className={styles.addButton} onClick={onAddPlace}>+</button>
            )}
        </div>
    );
};

export default DetailPlanComponent;
