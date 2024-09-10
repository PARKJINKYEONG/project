import React, { useState, useEffect, useRef, useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../../styles/restaurantSearch.module.css';
import axios from 'axios';
import { UserContext } from '../../contexts/userContext';

const RestaurantSearch = () => {
  const [query, setQuery] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [radius, setRadius] = useState(2500);
  const [places, setPlaces] = useState([]);
  const [showReviews, setShowReviews] = useState({});
  const [showHours, setShowHours] = useState({});
  const [nextPageToken, setNextPageToken] = useState(null);
  const [sortOrder, setSortOrder] = useState('review');
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);
  const { email, accessToken } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlaceName, setSelectedPlaceName] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState(null); 
  const [favoritePlaces, setFavoritePlaces] = useState({});
  const [savedRestaurantId, setSavedRestaurantId] = useState(null);
  const [placeDetailsMap, setPlaceDetailsMap] = useState({});
  const [markers, setMarkers] = useState([]); // 마커 상태 추가
  const [infoWindow, setInfoWindow] = useState(null); // InfoWindow 상태 추가
  const [modalTrigger, setModalTrigger] = useState(null); // 모달 트리거 상태 추가

  useEffect(() => {
    const loadMap = () => {
      if (window.google && window.google.maps) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: 11,
        });

        setMap(mapInstance);
        geocoderRef.current = new window.google.maps.Geocoder();

        const handleMapClick = (event) => {
          const latLng = event.latLng;
          if (geocoderRef.current) {
            geocoderRef.current.geocode({ location: latLng }, (results, status) => {
              if (status === 'OK' && results.length > 0) {
                setUserLocation(results[0].formatted_address);
                setMapCenter({ lat: latLng.lat(), lng: latLng.lng() });
                mapInstance.setCenter(latLng);
                performSearch(mapInstance, query, latLng, radius);
              } else {
                alert('주소를 찾을 수 없습니다.');
              }
            });
          }
        };

        mapInstance.addListener('click', handleMapClick);

        return () => {
          window.google.maps.event.clearListeners(mapInstance, 'click');
        };
      } else {
        console.error('Google Maps API 로드에 실패했습니다.');
      }
    };

    if (window.google && window.google.maps) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-COY1Ryjaa2wILZqfl5UoS2WltfYD3Hc&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, [mapCenter, query, radius]);

  useEffect(() => {
    if (places.length > 0) {
      const sortedPlaces = [...places];

      if (sortOrder === 'rating') {
        sortedPlaces.sort((a, b) => b.rating - a.rating);
      } else if (sortOrder === 'reviews') {
        sortedPlaces.sort((a, b) => (b.reviews && b.reviews.length) - (a.reviews && a.reviews.length));
      }

      setPlaces(sortedPlaces);
    }
  }, [sortOrder]);

  useEffect(() => {
    // 마커를 지도에서 제거
    if (map) {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
      if (infoWindow) {
        infoWindow.close(); // 이전 InfoWindow 닫기
      }
    }

    // 새로운 마커와 InfoWindow를 추가
    const newMarkers = places.map(place => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        map: map,
        title: place.name,
      });

      marker.addListener('click', () => {
        setSelectedPlaceName(place.name);
        setSelectedPlaceId(place.place_id);

        // InfoWindow 생성 및 표시
        if (infoWindow) {
          infoWindow.close();
        }
        const newInfoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${place.name}</strong></div>`,
        });
        newInfoWindow.open(map, marker);
        setInfoWindow(newInfoWindow);

        // 모달 열기 (하트 클릭으로만 모달 열기)
        if (modalTrigger === 'heart') {
          setModalOpen(true);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [places, map, modalTrigger]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleUserLocationChange = (event) => {
    setUserLocation(event.target.value);
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

  const saveRestaurantToDB = async (restaurant) => {
    try {
      const response = await axios.post('http://localhost:8080/api/places/foods/create', restaurant, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('음식점 저장 성공:', response.data);
      return response.data.id; // ID를 반환
    } catch (error) {
      console.error('음식점 저장 실패:', error);
      return null; // 실패 시 null 반환
    }
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

        const promises = results.map((place) => {
          return new Promise((resolve) => {
            service.getDetails({ placeId: place.place_id }, (details, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {

                // 국가 정보 추가
                const country = details.address_components.find(component => component.types.includes('country'))?.long_name || '정보 없음';

                // 첫 번째 이미지만 추출
                const imageUrls = details.photos && details.photos.length > 0 
                  ? [details.photos[0].getUrl({ maxWidth: 200 })] 
                  : [];

                // 영업시간 처리
                const workingTime = details.opening_hours
                  ? details.opening_hours.weekday_text.join(', ')
                  : '정보 없음';

                const placeDetails = {
                  ...details,
                  formatted_phone_number: details.formatted_phone_number || '정보 없음',
                  country,
                  imageUrls,
                  workingTime,
                };

                console.log('음식점 세부 정보:', {
                  name: placeDetails.name,
                  address: placeDetails.formatted_address,
                  lat: placeDetails.geometry.location.lat(),
                  lng: placeDetails.geometry.location.lng(),
                  tel: placeDetails.formatted_phone_number,
                  averageReviewRate: details.rating || 0,
                  region: {
                    name: country,
                  },
                  imageUrls,
                  workingTime,  // 영업시간 정보
                });

                // placeDetailsMap 업데이트
                setPlaceDetailsMap(prev => ({
                  ...prev,
                  [place.place_id]: placeDetails,
                }));

                placesWithDetails.push(placeDetails);

              } else {
                console.error('PlacesService getDetails 상태:', status);
              }
              resolve();
            });
          });
        });

        Promise.all(promises).then(() => {
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

  const toggleHours = (placeId) => {
    setShowHours((prev) => ({
      ...prev,
      [placeId]: !prev[placeId],
    }));
  };

  const handleFavoriteClick = async (placeId, placeName) => {
    if (!accessToken) {
      alert('로그인 후 이용하세요.');
      return; 
    }
    
    if (favoritePlaces[placeId]) {
      // 즐겨찾기 제거
      try {
        const response = await axios.delete(`http://localhost:8080/api/bookmark/${favoritePlaces[placeId]}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          setFavoritePlaces((prev) => {
            const newFavorites = { ...prev };
            delete newFavorites[placeId];
            return newFavorites;
          });
        }
      } catch (error) {
        console.error('즐겨찾기 삭제 중 오류 발생!', error);
      }
    } else {
      // 즐겨찾기 추가
      setSelectedPlaceName(placeName);
      setSelectedPlaceId(placeId);
      setModalTrigger('heart'); // 모달 트리거를 하트로 설정

      const placeDetails = placeDetailsMap[placeId];
      if (!placeDetails) {
        console.error('선택된 장소의 세부 정보가 없습니다.');
        return;
      }
  
      // 음식점 객체 생성
      const restaurant = {
        foodName: placeDetails.name,
        address: placeDetails.formatted_address,
        lat: placeDetails.geometry.location.lat(),
        lng: placeDetails.geometry.location.lng(),
        tel: placeDetails.formatted_phone_number,
        averageReviewRate: placeDetails.rating || 0,
        region: {
          name: placeDetails.country,
        },
        imageUrls: placeDetails.imageUrls,
        workingTime: placeDetails.workingTime,
      };
  
      // 음식점 저장 및 즐겨찾기 추가
      const restaurantId = await saveRestaurantToDB(restaurant);
  
      if (restaurantId) {
        setSavedRestaurantId(restaurantId);
        setModalOpen(true);
      } else {
        console.error('음식점 저장 실패로 인해 즐겨찾기 추가를 할 수 없습니다.');
      }
    }
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
    setModalTrigger(null); // 모달 트리거 초기화
  };

  const handleSaveFavorite = async () => {
    if (selectedPlaceId === null || savedRestaurantId === null) {
      console.error('선택된 장소가 없습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/bookmark', {
        targetId: savedRestaurantId, 
        isFood: 1,  
        email,
        target: 'food'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 201) {
        setFavoritePlaces((prev) => ({
          ...prev,
          [selectedPlaceId]: response.data.id,
        }));
        setModalOpen(false);
      } else {
        console.error('즐겨찾기 추가 실패', response.status);
      }
    } catch (error) {
      console.error('즐겨찾기 추가 중 오류 발생!', error);
    }
  };
  
  return (
    <div>
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
          <option value="reviews">정렬</option>
          <option value="rating">별점 순</option>
        </select>
        <div className={styles.searchButtonContainer}>
          <button onClick={handleSearch} className={styles.searchButton}>
            검색
          </button>
        </div>
      </div>
      <div
        ref={mapRef}
        style={{ height: '400px', width: '100%' }}
      ></div>
      <div className={styles.placesContainer}>
        {places.map((place) => (
          <div key={place.place_id} className={styles.placeCard}>
            {favoritePlaces[place.place_id] ? (
              <FavoriteIcon
                className={styles.favoriteIcon}
                onClick={() => handleFavoriteClick(place.place_id, place.name)}
                sx={{ color: 'red', cursor: 'pointer' }}
              />
            ) : (
              <FavoriteBorderIcon
                className={styles.favoriteIcon}
                onClick={() => handleFavoriteClick(place.place_id, place.name)}
                sx={{ cursor: 'pointer' }}
              />
            )}
            <h2>{place.name}</h2>
            {place.photos && place.photos.length > 0 && (
              <img
                src={place.photos[0].getUrl({ maxWidth: 200 })}
                alt={place.name}
                className={styles.placeImage}
              />
            )}
            <p>{place.vicinity}</p>
            {place.rating && (
              <p>별점: {place.rating}</p>
            )}
            {place.formatted_phone_number && (
              <p>전화번호: {place.formatted_phone_number}</p>
            )}
            {place.country && (  // 국가 정보를 표시합니다.
              <p>국가: {place.country}</p>
            )}

            <div style={{ marginBottom: '10px' }}> {/* 여기에 간격을 추가합니다. */}
              <button onClick={() => toggleHours(place.place_id)}>
                {showHours[place.place_id] ? '영업시간 숨기기' : '영업시간 보기'}
              </button>
            </div>
            {showHours[place.place_id] && place.opening_hours !== '정보 없음' && (
              <div className={styles.hoursContainer}>
                {place.opening_hours.split(', ').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            )}
            <div style={{ marginBottom: '10px' }}> {/* 여기에 간격을 추가합니다. */}
              {place.reviews && (
                <button onClick={() => toggleReviews(place.place_id)}>
                  {showReviews[place.place_id] ? '리뷰 숨기기' : '리뷰 보기'}
                </button>
              )}
            </div>
            {showReviews[place.place_id] && place.reviews && (
              <ul>
                {place.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.author_name}</strong>: {review.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {nextPageToken && (
          <button onClick={loadMore} className={styles.loadMoreButton}>
            더 보기
          </button>
        )}
      </div>

      {/* 모달 코드 */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <h2>즐겨찾기 추가</h2>
          <TextField
            label="즐겨찾기 제목"
            value={selectedPlaceName}
            fullWidth
            margin="normal"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleSaveFavorite}
              variant="contained"
              color="primary"
            >
              저장
            </Button>
          </div>
        </Box>
      </Modal>

    </div>
  );
};

export default RestaurantSearch;