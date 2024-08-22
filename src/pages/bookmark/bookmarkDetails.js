import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../styles/bookmarkDetails.module.css';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import MuiModal from '../../components/muiModal';
import GuestCounter from '../../components/guestCounter';
import { Box, Button, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function BookmarkDetails() {

  const location = useLocation(); 
  const { title } = location.state || {}; 

  const [memoModalIsOpen, setMemoModalIsOpen] = useState(false);
  const [guestModalIsOpen, setGuestModalIsOpen] = useState(false);
  const [dateModalIsOpen, setDateModalIsOpen] = useState(false);
  const [memo, setMemo] = useState('');
  const [savedMemo, setSavedMemo] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [guestSummary, setGuestSummary] = useState('게스트 1명');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [searchResult, setSearchResult] = useState(center);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);

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
    setMemoModalIsOpen(true);
  };

  const closeMemoModal = () => {
    setMemoModalIsOpen(false);
  };

  const openGuestModal = () => {
    setGuestModalIsOpen(true);
  };

  const closeGuestModal = () => {
    const summary = [];
    if (adults > 0) summary.push(`성인 ${adults}명`);
    if (children > 0) summary.push(`어린이 ${children}명`);
    if (infants > 0) summary.push(`유아 ${infants}명`);
    if (pets > 0) summary.push(`반려동물 ${pets}마리`);

    setGuestSummary(summary.join(', ') || '게스트 1명');
    setGuestModalIsOpen(false);
  };

  const openDateModal = () => {
    setDateModalIsOpen(true);
  };

  const closeDateModal = () => {
    setDateModalIsOpen(false);
  };

  const handleMemoChange = (e) => {
    setMemo(e.target.value);
  };

  const handleSaveMemo = () => {
    setSavedMemo(memo);
    closeMemoModal();
  };

  const handleClearMemo = () => {
    setMemo('');
  };

  const handleGuestChange = (type, operation) => {
    if (type === 'adults') {
      setAdults(operation === 'increment' ? adults + 1 : adults - 1);
    } else if (type === 'children') {
      setChildren(operation === 'increment' ? children + 1 : children - 1);
    } else if (type === 'infants') {
      setInfants(operation === 'increment' ? infants + 1 : infants - 1);
    } else if (type === 'pets') {
      setPets(operation === 'increment' ? pets + 1 : pets - 1);
    }
  };

  const guests = [
    { type: 'adults', label: '성인 (13세 이상)', value: adults, minValue: 1 },
    { type: 'children', label: '어린이 (2-12세)', value: children },
    { type: 'infants', label: '유아 (2세 미만)', value: infants },
    { type: 'pets', label: '반려동물', value: pets },
  ];

  const handleReset = () => {
    setAdults(1);
    setChildren(0);
    setInfants(0);
    setPets(0);
    setGuestSummary('게스트 1명');
    setStartDate(null);
    setEndDate(null);
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format('YYYY-MM-DD') : '';
  };

  return (
    <div className={styles['bookmark-details']}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles['button-group']}>
          <button className={styles.button} onClick={openDateModal}>
            {startDate && endDate ? `${formatDate(startDate)} ~ ${formatDate(endDate)}` : '날짜 입력하기'}
          </button>
          <button className={styles.button} onClick={openGuestModal}>{guestSummary}</button>
        </div>
        <div className={styles['bookmark-list']}>
          <div className={styles['bookmark-item']}>
            <div className={styles['bookmark-image-grid']}>
              <img src="image1.jpg" alt="item1" className={styles['grid-image']} />
            </div>
          </div>
          {savedMemo ? (
            <>
              <div className={styles['saved-memo-container']}>
                <div className={styles['saved-memo']}>{savedMemo}</div>
              </div>
              <button className={styles['memo-button']} onClick={openMemoModal}>메모 수정</button>
            </>
          ) : (
            <button className={styles['memo-button']} onClick={openMemoModal}>메모 추가</button>
          )}
        </div>
      </div>
  
      <div className={styles['map-container']}>
        <LoadScript googleMapsApiKey="AIzaSyB-COY1Ryjaa2wILZqfl5UoS2WltfYD3Hc" libraries={["places"]}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={searchResult} zoom={10}>
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

<MuiModal
  open={guestModalIsOpen}
  onClose={closeGuestModal}
  title="게스트 설정"
  content={
    <GuestCounter 
      guests={guests}
      handleGuestChange={handleGuestChange}
    />
  }
  actions={[
    <Button 
      key="reset" 
      onClick={handleReset} 
      variant="contained" 
      color="error" 
      sx={{ width: '100px' }}>
      다시 설정
    </Button>,
    <Button 
      key="save" 
      onClick={closeGuestModal} 
      variant="contained" 
      color="primary" 
      sx={{ width: '100px' }}>
      저장
    </Button>
  ]}
/>

<MuiModal
  open={dateModalIsOpen}
  onClose={closeDateModal}
  title="날짜 선택"
  content={
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          if (date && endDate && date > endDate) {
            setEndDate(null);
          }
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        customInput={<TextField fullWidth />}
        placeholderText="시작 날짜"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || new Date()}
        customInput={<TextField fullWidth />}
        placeholderText="종료 날짜"
      />
    </Box>
  }
  actions={[
    <Button 
      key="reset" 
      onClick={handleReset} 
      variant="contained" 
      color="error" 
      sx={{ width: '100px' }}>
      다시 설정
    </Button>,
    <Button 
      key="save" 
      onClick={closeDateModal} 
      variant="contained" 
      color="primary" 
      sx={{ width: '100px' }}>
      저장
    </Button>
  ]}
/>
    </div>
  );
}
