import React, { useState, useEffect, useRef } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../../styles/restaurantSearch.module.css';
import axios from 'axios';


const RestaurantSearch = () => {
  const [query, setQuery] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [radius, setRadius] = useState(2500);
  const [places, setPlaces] = useState([]);
  const [showReviews, setShowReviews] = useState({});
  const [showHours, setShowHours] = useState({});
  const [nextPageToken, setNextPageToken] = useState(null);
  const [sortOrder, setSortOrder] = useState('rating');
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlaceName, setSelectedPlaceName] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [favoritePlaces, setFavoritePlaces] = useState({});

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

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleUserLocationChange = (event) => {
    setUserLocation(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadius(Number(event.target.value));
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

  const saveRestaurantToDB = (restaurant) => {
    axios.post('http://localhost:8080/api/places/foods/create', restaurant, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        console.log('음식점 저장 성공:', resp.data);
      })
      .catch((error) => {
        console.error('음식점 저장 실패:', error);
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

                saveRestaurantToDB({
                  foodName: placeDetails.name,
                  address: placeDetails.formatted_address,
                  lat: placeDetails.geometry.location.lat(),
                  lng: placeDetails.geometry.location.lng(),
                  tel: placeDetails.formatted_phone_number,
                  averageReviewRate: details.rating || 0,
                  region: {
                    name: country,
                  },
                  imageUrls,  // 첫 번째 이미지 URL만 저장
                  workingTime,  // 영업시간 정보 저장
                });

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

  const handleFavoriteClick = (placeId, placeName) => {
    if (favoritePlaces[placeId]) {
      setFavoritePlaces((prev) => {
        const newFavorites = { ...prev };
        delete newFavorites[placeId];
        return newFavorites;
      });
    } else {
      setSelectedPlaceName(placeName);
      setSelectedPlaceId(placeId);
      setModalOpen(true);
    }
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
