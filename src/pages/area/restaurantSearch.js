import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/restaurantSearch.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, TextField } from '@mui/material';
import MuiModal from '../../components/muiModal'; 
import SearchAppBar from './areaContent';

const RestaurantSearch = () => {
  const [query, setQuery] = useState('');  // 음식 검색어
  const [userLocation, setUserLocation] = useState('');  // 사용자 위치
  const [radius, setRadius] = useState('2500');  // 반경 (초기값 설정)
  const [places, setPlaces] = useState([]);
  const [showReviews, setShowReviews] = useState({});
  const [nextPageToken, setNextPageToken] = useState(null);
  const [sortOrder, setSortOrder] = useState('rating');  // 정렬 기준 (별점순, 거리순, 댓글순)
  const [map, setMap] = useState(null);  // 지도를 저장할 상태
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });  // 지도 중심
  const mapRef = useRef(null);  // 실제 지도가 렌더링될 div를 참조
  const geocoderRef = useRef(null); // Geocoder 인스턴스를 저장할 ref

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlaceName, setSelectedPlaceName] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [favoritePlaces, setFavoritePlaces] = useState({});  // 각 장소의 즐겨찾기 상태를 저장

  useEffect(() => {
    if (window.google && window.google.maps) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 11,
      });

      setMap(mapInstance);

      // 지도를 클릭했을 때 위치를 검색하여 userLocation을 업데이트합니다.
      mapInstance.addListener('click', (event) => {
        const latLng = event.latLng;
        if (geocoderRef.current) {
          geocoderRef.current.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
              setUserLocation(results[0].formatted_address);
              setMapCenter({ lat: latLng.lat(), lng: latLng.lng() });  // 클릭한 위치로 지도 중심 업데이트
              mapInstance.setCenter(latLng);  // 지도 중심을 클릭한 위치로 이동
              performSearch(mapInstance, query, latLng, radius);  // 새로운 위치로 검색 수행
            } else {
              alert('주소를 찾을 수 없습니다.');
            }
          });
        }
      });

      // Geocoder 인스턴스를 생성하여 ref에 저장
      geocoderRef.current = new window.google.maps.Geocoder();

      // 처음 지도 생성 시, Geocoder 인스턴스도 함께 생성
      return () => {
        if (geocoderRef.current) {
          geocoderRef.current = null;
        }
      };
    } else {
      console.error('Google Maps API 로드에 실패했습니다.');
    }
  }, [mapCenter, query, radius]);

  // 새로 정렬 기준이 변경되면 현재의 places를 정렬합니다.
  useEffect(() => {
    if (places.length > 0) {
      const sortedPlaces = [...places];

      if (sortOrder === 'rating') {
        sortedPlaces.sort((a, b) => b.rating - a.rating);
      } else if (sortOrder === 'distance') {
        sortedPlaces.sort((a, b) => a.distance - b.distance);
      } else if (sortOrder === 'reviews') {
        sortedPlaces.sort((a, b) => (b.reviews && b.reviews.length) - (a.reviews && a.reviews.length));
      }

      setPlaces(sortedPlaces);
    }
  }, [sortOrder]);  // sortOrder가 변경될 때마다 실행

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleUserLocationChange = (event) => {
    setUserLocation(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearch = () => {
    if (!window.google || !window.google.maps || !mapRef.current) {
      console.error('Google Maps API가 제대로 로드되지 않았습니다.');
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: userLocation }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        setMapCenter({ lat: location.lat(), lng: location.lng() });
        map.setCenter(location);
        setPlaces([]);
        setNextPageToken(null);
        performSearch(map, query, location, radius);
      } else {
        alert('위치 정보를 찾을 수 없습니다. 정확한 주소를 입력하세요.');
      }
    });
  };

  const performSearch = (mapInstance, query, location = null, radius, pageToken = null) => {
    if (isNaN(radius) || radius <= 0) {
      alert('반경이 유효하지 않습니다.');
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstance);
    const request = {
      query,
      location: location || mapInstance.getCenter(),
      radius: parseInt(radius, 10),
      type: ['restaurant'],
      pageToken: pageToken,
    };

    service.textSearch(request, (results, status, pagination) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const placesWithDetails = [];
        const center = mapInstance.getCenter();

        const promises = results.map((place) => {
          return new Promise((resolve) => {
            service.getDetails({ placeId: place.place_id }, (details, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                  center,
                  new window.google.maps.LatLng(details.geometry.location.lat(), details.geometry.location.lng())
                );

                placesWithDetails.push({
                  ...details,
                  distance: (distance / 1000).toFixed(2), // 거리(km) 단위로 변환하여 소수점 2자리까지 표시
                });
              } else {
                console.error('PlacesService getDetails 상태:', status);
              }
              resolve();
            });
          });
        });

        Promise.all(promises).then(() => {
          // 정렬 기준에 따라 결과를 정렬합니다.
          if (sortOrder === 'rating') {
            placesWithDetails.sort((a, b) => b.rating - a.rating);
          } else if (sortOrder === 'distance') {
            placesWithDetails.sort((a, b) => a.distance - b.distance);
          } else if (sortOrder === 'reviews') {
            placesWithDetails.sort((a, b) => (b.reviews && b.reviews.length) - (a.reviews && a.reviews.length));
          }
          setPlaces(placesWithDetails);
          if (pagination && pagination.hasNextPage) {
            setNextPageToken(pagination.nextPageToken);
          } else {
            setNextPageToken(null);
          }
        });

      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('해당 검색어에 대한 결과가 없습니다. 다른 검색어를 시도해 보세요.');
        setPlaces([]);
      } else {
        console.error('PlacesService 상태:', status);
      }
    });
  };

  const loadMore = () => {
    if (nextPageToken && mapRef.current) {
      performSearch(mapRef.current, query, null, radius, nextPageToken);
    }
  };

  const toggleReviews = (placeId) => {
    setShowReviews((prev) => ({
      ...prev,
      [placeId]: !prev[placeId],
    }));
  };

  const handleFavoriteClick = (placeId, placeName) => {
    setSelectedPlaceName(placeName);
    setSelectedPlaceId(placeId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveFavorite = () => {
    setFavoritePlaces((prev) => ({
      ...prev,
      [selectedPlaceId]: true,
    }));
    setModalOpen(false);
  };

  return (
    <div>
    <SearchAppBar />
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={userLocation}
        onChange={handleUserLocationChange}
        placeholder="위치를 입력"
      />
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="음식 또는 음식점"
      />
      
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="rating">별점 순</option>
        <option value="distance">거리 가까운 순</option>
        <option value="reviews">댓글 수 순</option>
      </select>
      <div className={styles.searchButtonContainer}>
        <button onClick={handleSearch} className={styles.searchButton}>
          검색
        </button>
      </div>
    </div>
    <div
      ref={mapRef}
      style={{ height: '400px', width: '100%' }}  // 지도 표시 영역
    ></div>
      <div className={styles.placesContainer}>
        {places.map((place) => (
          <div key={place.place_id} className={styles.placeCard}>
            {favoritePlaces[place.place_id] ? (
              <FavoriteIcon
                className={styles.favoriteIcon}
                onClick={() => handleFavoriteClick(place.place_id, place.name)}
                sx={{ color: 'red' }}
              />
            ) : (
              <FavoriteBorderIcon
                className={styles.favoriteIcon}
                onClick={() => handleFavoriteClick(place.place_id, place.name)}
              />
            )}
            {place.photos && place.photos.length > 0 && (
              <img
                src={place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 })}
                alt={place.name}
                className={styles.placeImage}
              />
            )}
            <div className={styles.placeDetails}>
              <div>
                <h3>{place.name}</h3>
                <p>{place.vicinity}</p>
                <p>별점: {place.rating}</p>
                <p>거리: {place.distance} km</p>
                {place.formatted_phone_number && <p>전화번호: {place.formatted_phone_number}</p>}
                <button onClick={() => toggleReviews(place.place_id)}>
                  {showReviews[place.place_id] ? '리뷰 숨기기' : '리뷰 보기'}
                </button>
                {showReviews[place.place_id] && place.reviews && place.reviews.length > 0 && (
                  <div className={styles.reviewsContainer}>
                    <h4>리뷰:</h4>
                    <ul className={styles.reviewsList}>
                      {place.reviews.map((review, index) => (
                        <li key={index} className={styles.reviewItem}>
                          <p><strong>{review.author_name}:</strong> {review.text}</p>
                          <p>별점: {review.rating}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {nextPageToken && <button onClick={loadMore}>더 보기</button>}

      <MuiModal
        open={modalOpen}
        onClose={handleModalClose}
        title="즐겨찾기 추가"
        content={
          <TextField
            label="즐겨찾기 제목"
            value={selectedPlaceName}
            onChange={(e) => setSelectedPlaceName(e.target.value)}
            fullWidth
          />
        }
        actions={
          <Button onClick={handleSaveFavorite} variant="contained">
            저장
          </Button>
        }
      />
    </div>
  );
};

export default RestaurantSearch;
