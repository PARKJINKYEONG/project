import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/bookmarkDetails.module.css';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import MuiModal from '../../components/muiModal';
import { Button } from '@mui/material';
import { UserContext } from '../../contexts/userContext';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

export default function BookmarkDetails() {
  const location = useLocation();
  const { placeName, imageUrls, favoriteId, lat, lng } = location.state || {};
  const { accessToken } = useContext(UserContext);

  const [memoModalIsOpen, setMemoModalIsOpen] = useState(false);
  const [memo, setMemo] = useState('');
  const [savedMemo, setSavedMemo] = useState('');
  const [searchBox, setSearchBox] = useState(null);
  const [searchResult, setSearchResult] = useState({ lat: lat || 41.9028, lng: lng || 12.4964 });
  const [errorMessage, setErrorMessage] = useState('');
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch the saved memo when the component mounts
  useEffect(() => {
    if (!favoriteId) return;

    setLoading(true); // Set loading to true when fetching data

    axios.get(`http://localhost:8080/api/bookmark/${favoriteId}/memo`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const responseData = response.data;
      if (responseData && responseData.memo) {
        // Assuming responseData.memo is a string like '{"memo":"123123"}'
        const memoString = responseData.memo.replace(/.*"memo":"(.*?)".*/s, '$1');
        setSavedMemo(memoString || ''); 
      } else {
        setSavedMemo('');
      }
      setLoading(false); // Set loading to false after data is fetched
    })
    .catch(error => {
      console.error('Error fetching memo:', error);
      setLoading(false); // Set loading to false even if there is an error
    });

  }, [favoriteId, accessToken]);

  const onLoad = ref => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) {
      setErrorMessage('검색 결과가 없습니다.');
      return;
    }
    const place = places[0];

    setSearchResult({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    });

    setErrorMessage('');
  };

  const toggleSearchBox = () => {
    setSearchBoxVisible(!searchBoxVisible);
  };

  const openMemoModal = () => {
    setMemo(savedMemo);
    setMemoModalIsOpen(true);
  };

  const closeMemoModal = () => {
    setMemoModalIsOpen(false);
  };

  const handleMemoChange = (e) => {
    setMemo(e.target.value);
  };

  const handleSaveMemo = () => {
    if (!favoriteId) {
      console.error('Favorite ID is missing');
      return;
    }

    axios.put(`http://localhost:8080/api/bookmark/${favoriteId}/memo`, 
      { memo },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      const responseData = response.data;
      if (responseData && responseData.memo) {
        // Assuming responseData.memo is a string like '{"memo":"123123"}'
        const memoString = responseData.memo.replace(/.*"memo":"(.*?)".*/s, '$1');
        setSavedMemo(memoString || ''); 
      } else {
        setSavedMemo('');
      }
      closeMemoModal();
    })
    .catch(error => {
      console.error('Error saving memo:', error);
    });
  };

  const handleClearMemo = () => {
    setMemo('');
  };

  return (
    <div className={styles['bookmark-details']}>
      {loading ? <p>Loading...</p> : (
        <>
          <div className={styles.content}>
            {placeName && <h3 className={styles['place-name']}>{placeName}</h3>}
            <div className={styles['bookmark-image-grid']}>
              {imageUrls && imageUrls.length > 0 ? (
                imageUrls.map((image, idx) => (
                  <img key={idx} src={image} alt={`Place ${idx}`} className={styles['grid-image']} />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className={styles['button-group']}>
              <button className={styles.button} onClick={openMemoModal}>
                {savedMemo ? '메모 수정' : '메모 추가'}
              </button>
            </div>
            <div className={styles['bookmark-list']}>
              {savedMemo && (
                <div className={styles['saved-memo-container']}>
                  <div className={styles['saved-memo']}>{savedMemo}</div>
                </div>
              )}
            </div>
          </div>

          <div className={styles['map-container']}>
            <LoadScript googleMapsApiKey="AIzaSyB-COY1Ryjaa2wILZqfl5UoS2WltfYD3Hc" libraries={["places"]}>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={searchResult} zoom={12}>
                <Marker position={searchResult} />
              </GoogleMap>
              <button onClick={toggleSearchBox} className={styles['toggle-button']}>
                {searchBoxVisible ? '검색 박스 숨기기' : '검색 박스 보이기'}
              </button>
              {searchBoxVisible && (
                <div className={styles['search-box-container']}>
                  <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                    <input type="text" placeholder="검색할 장소를 입력하세요" className={styles['search-box']} />
                  </StandaloneSearchBox>
                </div>
              )}
            </LoadScript>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          </div>

          <MuiModal
            open={memoModalIsOpen}
            onClose={closeMemoModal}
            title="메모 추가"
            content={
              <>
                <textarea 
                  value={memo} 
                  onChange={handleMemoChange} 
                  maxLength="250"
                  placeholder="메모 추가"
                  className={styles.textarea} 
                />
                <div>{memo.length}/250자</div>
              </>
            }
            actions={[
              <Button 
                key="clear" 
                onClick={handleClearMemo} 
                variant="contained" 
                color="error" 
                sx={{ width: '100px' }}>
                초기화
              </Button>,
              <Button 
                key="save" 
                onClick={handleSaveMemo} 
                variant="contained" 
                color="primary" 
                sx={{ width: '100px' }}>
                저장
              </Button>
            ]}
          />
        </>
      )}
    </div>
  );
}
