import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/restaurantSearch.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, TextField } from '@mui/material';
import MuiModal from '../../components/muiModal'; 

const RestaurantSearch = () => {
  const [query, setQuery] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [radius, setRadius] = useState(2500);
  const [places, setPlaces] = useState([]);
  const [showReviews, setShowReviews] = useState({});
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
                placesWithDetails.push(details);
              } else {
                console.error('PlacesService getDetails 상태:', status);
              }
              resolve();
            });
          });
        });

        Promise.all(promises).then(() => {
          if (sortOrder === 'rating') {
            placesWithDetails.sort((a, b) => b.rating - a.rating);
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
                sx={{ color: 'red' }}
              />
            ) : (
              <FavoriteBorderIcon
                className={styles.favoriteIcon}
                onClick={() => handleFavoriteClick(place.place_id, place.name)}
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
            {place.reviews && (
              <button onClick={() => toggleReviews(place.place_id)}>
                {showReviews[place.place_id] ? '리뷰 숨기기' : '리뷰 보기'}
              </button>
            )}
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
      <MuiModal
        open={modalOpen}
        onClose={handleModalClose}
        onSave={handleSaveFavorite}
        placeName={selectedPlaceName}
      />
    </div>
  );
};

export default RestaurantSearch;
