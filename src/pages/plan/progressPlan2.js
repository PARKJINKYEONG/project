import React, { useEffect, useState } from 'react';
import styles from '../../styles/plan/createPlan/progressPlan2.module.css';
import MapComponent from './mapComponent';
import DetailPlanComponent from './detailPlanComponent';
import useRequest from '../../hooks/useRequest';

const ProgressPlan2 = ({ selectedPlaces, onAddPlace, onRemovePlace }) => {
  const { get } = useRequest();
  const [selectedTab, setSelectedTab] = useState('선택된 관광지');
  const [selectedCategory, setSelectedCategory] = useState('행사');

  const [event, setEvent] = useState([]);
  const [sight, setSight] = useState([]);
  const [food, setFood] = useState([]);

  // API에서 데이터를 가져옴
  useEffect(() => {
    const getEvent = async () => {
      try {
        const resp = await get('/api/places/events/all');
        setEvent(resp.data);
        console.log('event data:', resp.data); // 상태 업데이트 후 값 확인
      } catch (err) {
        console.log("에러발생:", err);
      }
    };
    const getSight = async () => {
      try {
        const resp = await get('/api/places/sights/all');
        setSight(resp.data);
        console.log('sight data:', resp.data);
      } catch (err) {
        console.log("에러발생:", err);
      }
    };
    const getFood = async () => {
      try {
        const resp = await get('/api/places/foods/all');
        setFood(resp.data);
        console.log('food data:', resp.data);
      } catch (err) {
        console.log("에러발생:", err);
      }
    };

    getEvent();
    getSight();
    getFood();
  }, []);  // useRequest의 `get` 메서드에 따라 업데이트 감지

  // event 상태가 업데이트된 후 확인
  useEffect(() => {
    console.log('Updated event state:', event);
  }, [event]);  // event 상태가 변경될 때 실행

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // 이미 선택된 장소를 필터링 (빈 배열일 경우 필터링하지 않음)
  const filterSelectedPlaces = (places) => {
    if (!selectedPlaces || selectedPlaces.length === 0) {
      return places;  // 선택된 장소가 없으면 필터링하지 않음
    }

    return places.filter((place) => {
      return Array.isArray(selectedPlaces) && !selectedPlaces.some((selected) => selected.id === place.id);
    });
  };

  // 카테고리에 따른 장소 데이터를 가져옴
  const getSelectedCategoryData = () => {
    switch (selectedCategory) {
      case '행사':
        return filterSelectedPlaces(event);
      case '명소':
        return filterSelectedPlaces(sight);
      case '음식점':
        return filterSelectedPlaces(food);
      default:
        return [];
    }
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>가보고 싶은 곳을 선택해주세요</h6>

      <div className={styles.tabButtons}>
        <button
          className={selectedTab === '선택된 관광지' ? styles.activeCategory : styles.tabButton}
          onClick={() => handleTabChange('선택된 관광지')}
        >
          선택된 관광지
        </button>
        <button
          className={selectedTab === '관광지 검색 및 추천' ? styles.activeCategory : styles.tabButton}
          onClick={() => handleTabChange('관광지 검색 및 추천')}
        >
          관광지 검색 및 추천
        </button>
      </div>

      {selectedTab === '선택된 관광지' ? (
        <div>
          <div className={styles.categoryButtons}>
            <button
              className={selectedCategory === '행사' ? styles.activeCategory : styles.tabButton}
              onClick={() => handleCategoryChange('행사')}
            >
              행사
            </button>
            <button
              className={selectedCategory === '명소' ? styles.activeCategory : styles.tabButton}
              onClick={() => handleCategoryChange('명소')}
            >
              명소
            </button>
            <button
              className={selectedCategory === '음식점' ? styles.activeCategory : styles.tabButton}
              onClick={() => handleCategoryChange('음식점')}
            >
              음식점
            </button>
          </div>

          <div>
            {/* 선택된 카테고리 데이터를 DetailPlanComponent로 전달 */}
            {getSelectedCategoryData().map((place, index) => (
              <DetailPlanComponent
                key={index}
                imageUrl={place.isHasImage ? 'https://via.placeholder.com/150' : null}
                selectedCategory={selectedCategory}
                placeName={place.eventName || place.name}
                address={place.address}
                startDate={place.eventStartDate}
                endDate={place.eventEndDate}
                onAddPlace={() => onAddPlace(place)}  // 장소 추가 핸들러
                onRemovePlace={() => onRemovePlace(place)}  // 장소 제거 핸들러
              />
            ))}
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

          <div className={styles.mapContainer}>
            <MapComponent />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPlan2;
