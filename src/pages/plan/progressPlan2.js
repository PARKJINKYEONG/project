import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Modal from 'react-modal';
import { Box, Card, CardContent, Typography } from '@mui/material';

const restaurants = [
  { name: 'BBQ', type: 'Korean', allergens: [], location: { lat: 37.5665, lng: 126.9780 } },
  { name: '초밥', type: 'Japanese', allergens: ['Fish'], location: { lat: 35.6895, lng: 139.6917 } },
  { name: '파스타', type: 'Western', allergens: ['Egg', 'Milk'], location: { lat: 48.8566, lng: 2.3522 } },
];

const attractions = [
  { name: '경복궁', image:'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MDJfMTgx%2FMDAxNzE0NjQ5MjY1NjU1.MDh3xJAd2ta5iLlSm9NGw70iPMWiu3jtFZ6QVL5ElXIg.GZYjEA3uoSC6ZPMFvPo5d49mOLz63mCefpXkCJxWxKAg.PNG%2Fseokjin-KakaoTalk_20240502_161923040_01.png&type=sc960_832', description: '서울에 위치한 경복궁입니다.', location: { lat: 37.579887, lng: 126.976870 } },
  { name: '에펠탑', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQCKyyoFQn3gdEOS-DbRLbagGpjIMf32vSw&s', description: '프랑스 파리의 상징적인 랜드마크입니다.', location: { lat: 48.8584, lng: 2.2945 } },
  { name: '타임스 스퀘어', image: 'https://res.cloudinary.com/kyte/image/upload/w_936,q_auto,f_auto,e_sharpen:50/v1604559372/content/free/US/new_york_3', description: '뉴욕의 중심지로, 활기찬 분위기를 자랑합니다.', location: { lat: 40.7580, lng: -73.9855 } },
  { name: '도쿄 타워', image: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/3jtQ/image/O7B_8bc2UVwFZcqFc8NHhdpbLkI.jpg', description: '도쿄의 랜드마크 타워입니다.', location: { lat: 35.6586, lng: 139.7454 } },
  { name: '시드니 오페라 하우스', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3b/95/61/photo2jpg.jpg?w=1200&h=-1&s=1', description: '호주의 상징적인 공연 예술 센터입니다.', location: { lat: -33.8568, lng: 151.2153 } },
  { name: '콜로세움', image: 'https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVDJUJEJTlDJUVCJUExJTlDJUVDJTg0JUI4JUVDJTlCJTgwfGVufDB8fDB8fHww', description: '로마의 고대 원형 경기장입니다.', location: { lat: 41.8902, lng: 12.4922 } },
  { name: '경복궁', image:'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA1MDJfMTgx%2FMDAxNzE0NjQ5MjY1NjU1.MDh3xJAd2ta5iLlSm9NGw70iPMWiu3jtFZ6QVL5ElXIg.GZYjEA3uoSC6ZPMFvPo5d49mOLz63mCefpXkCJxWxKAg.PNG%2Fseokjin-KakaoTalk_20240502_161923040_01.png&type=sc960_832', description: '서울에 위치한 경복궁입니다.', location: { lat: 37.579887, lng: 126.976870 } },
  { name: '에펠탑', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQCKyyoFQn3gdEOS-DbRLbagGpjIMf32vSw&s', description: '프랑스 파리의 상징적인 랜드마크입니다.', location: { lat: 48.8584, lng: 2.2945 } },
  { name: '타임스 스퀘어', image: 'https://res.cloudinary.com/kyte/image/upload/w_936,q_auto,f_auto,e_sharpen:50/v1604559372/content/free/US/new_york_3', description: '뉴욕의 중심지로, 활기찬 분위기를 자랑합니다.', location: { lat: 40.7580, lng: -73.9855 } },
  { name: '도쿄 타워', image: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/3jtQ/image/O7B_8bc2UVwFZcqFc8NHhdpbLkI.jpg', description: '도쿄의 랜드마크 타워입니다.', location: { lat: 35.6586, lng: 139.7454 } },
  { name: '시드니 오페라 하우스', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3b/95/61/photo2jpg.jpg?w=1200&h=-1&s=1', description: '호주의 상징적인 공연 예술 센터입니다.', location: { lat: -33.8568, lng: 151.2153 } },
  { name: '콜로세움', image: 'https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVDJUJEJTlDJUVCJUExJTlDJUVDJTg0JUI4JUVDJTlCJTgwfGVufDB8fDB8fHww', description: '로마의 고대 원형 경기장입니다.', location: { lat: 41.8902, lng: 12.4922 } }
];

const containerStyle = {
  marginTop: '100px',
  width: '100%',
  height: '100%',
};

const sectionStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '10px',
  width: '100%',
  maxWidth: '400px', // 최대 너비 설정
};

const sectionTitleStyle = {
  borderBottom: '2px solid #ddd',
  paddingBottom: '10px',
  marginBottom: '20px',
};

const cardStyle = {
  display: 'inline-block',
  width: '150px',
  cursor: 'pointer',
  borderRadius: '8px',
  border: '1px solid #ddd',
  marginRight: '5px',
  height: '150px',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '100px',
  objectFit: 'cover',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px'
};

const contentStyle = {
  padding: '10px'
};

const ProgressPlan2 = () => {
  const [foodType, setFoodType] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.9780 });
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(mapCenter);
      mapRef.current.setZoom(15);
    }
  }, [mapCenter]);

  const handleAllergyChange = (e) => {
    const value = e.target.value;
    setAllergies((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const filteredRestaurants = restaurants.filter((r) => {
    return r.type === foodType && !r.allergens.some((allergen) => allergies.includes(allergen));
  });

  const handleSelectRestaurant = (restaurant) => {
    setMapCenter(restaurant.location);
    setSelectedRestaurants((prev) => {
      const alreadySelected = prev.find((r) => r.name === restaurant.name);
      if (alreadySelected) {
        return prev.filter((r) => r.name !== restaurant.name);
      } else {
        return [...prev, restaurant];
      }
    });
  };

  const openModal = (info) => {
    setSelectedInfo(info);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSelectAttraction = (attraction) => {
    setSelectedAttractions((prev) => {
      const alreadySelected = prev.find((a) => a.name === attraction.name);
      if (alreadySelected) {
        return prev.filter((a) => a.name !== attraction.name);
      } else {
        return [...prev, attraction];
      }
    });
  };

  const handleMarkerClick = (info) => {
    setMapCenter(info.location);
    openModal(info);
  };

  return (
    <>
      <Box style={{ display: 'flex', padding: '20px', gap: '20px' }}>
        <Box style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          <Box style={sectionStyle}>
            <h2 style={sectionTitleStyle}>음식 카테고리</h2>
            <select value={foodType} onChange={(e) => setFoodType(e.target.value)} style={{ marginBottom: '20px', width: '100%' }}>
              <option value="">선택</option>
              <option value="Korean">한식</option>
              <option value="Chinese">중식</option>
              <option value="Japanese">일식</option>
              <option value="Western">양식</option>
              <option value="Others">기타</option>
            </select>
          </Box>

          <Box style={sectionStyle}>
            <h3 style={sectionTitleStyle}>알레르기 정보</h3>
            <Box style={{ marginBottom: '20px' }}>
              <label><input type="checkbox" value="Egg" onChange={handleAllergyChange} /> 계란</label>
              <label><input type="checkbox" value="Milk" onChange={handleAllergyChange} /> 우유</label>
              <label><input type="checkbox" value="Peanut" onChange={handleAllergyChange} /> 땅콩</label>
              <label><input type="checkbox" value="Pollen" onChange={handleAllergyChange} /> 꽃가루</label>

              {showMore && (
                <>
                  <label><input type="checkbox" value="Dust" onChange={handleAllergyChange} /> 먼지</label>
                  <label><input type="checkbox" value="Cat" onChange={handleAllergyChange} /> 고양이</label>
                  <label><input type="checkbox" value="Dog" onChange={handleAllergyChange} /> 개</label>
                  <label><input type="checkbox" value="Fish" onChange={handleAllergyChange} /> 생선</label>
                </>
              )}

              <button onClick={() => setShowMore(!showMore)}>
                {showMore ? '간단히' : '더보기+'}
              </button>
            </Box>
          </Box>

          {allergies.length > 0 && foodType && (
            <Box style={sectionStyle}>
              <h3 style={sectionTitleStyle}>식당 선택하기</h3>
              <ul style={{ marginBottom: '20px', listStyle: 'none', padding: 0 }}>
                {filteredRestaurants.map((restaurant, index) => (
                  <li
                    key={index}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedRestaurants.some((r) => r.name === restaurant.name) ? 'lightgray' : 'transparent',
                      padding: '10px',
                      borderBottom: '1px solid #ddd'
                    }}
                    onClick={() => handleSelectRestaurant(restaurant)}
                  >
                    {restaurant.name} - {restaurant.type}
                  </li>
                ))}
              </ul>
            </Box>
          )}

<Box style={sectionStyle}>
            <h3 style={sectionTitleStyle}>관광지 선택하기</h3>
            <Box style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '10px' }}>
              <Box style={{ display: 'inline-flex', gap: '10px' }}>
                {attractions.map((attraction, index) => (
                  <Card
                    key={index}
                    style={cardStyle}
                    onClick={() => {
                      handleSelectAttraction(attraction);
                      handleMarkerClick(attraction);
                    }}
                  >
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      style={imageStyle}
                    />
                    <CardContent style={contentStyle}>
                      <Typography variant="subtitle2" style={{ fontSize: '14px' }}>{attraction.name}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box style={{ flex: 1, padding: '20px' }}>
        <Box style={{ flex: 1, height: '50%' }}>
            <LoadScript googleMapsApiKey="AIzaSyB-COY1Ryjaa2wILZqfl5UoS2WltfYD3Hc">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={10}
                onLoad={(map) => (mapRef.current = map)}
              >
                {selectedRestaurants.map((restaurant, index) => (
                  <Marker
                    key={index}
                    position={restaurant.location}
                    onClick={() => handleMarkerClick(restaurant)}
                  />
                ))}
                {selectedAttractions.map((attraction, index) => (
                  <Marker
                    key={index}
                    position={attraction.location}
                    onClick={() => handleMarkerClick(attraction)}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </Box>
        </Box>
      </Box>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="상세 정보"
        style={{
          content: {
            width: '40%', 
            maxWidth: '600px', 
            height: 'auto',
            maxHeight: '90vh', 
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflowY: 'auto', 
            padding: '20px',
          },
        }}
      >
        {selectedInfo && (
          <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
            <h2>{selectedInfo.name}</h2>
            <img
              src={selectedInfo.image}
              alt={selectedInfo.name}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <p>{selectedInfo.description}</p>
            <button onClick={closeModal}>닫기</button>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default ProgressPlan2;