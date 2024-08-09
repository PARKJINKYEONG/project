import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../styles/bookmarkDetails.module.css';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

Modal.setAppElement('#root');

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
  const [searchBoxVisible, setSearchBoxVisible] = useState(false); // 검색 박스 토글 상태


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

  const handleReset = () => {
    setAdults(1);
    setChildren(0);
    setInfants(0);
    setPets(0);
    setGuestSummary('게스트 1명');
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const formatDate = (date) => {

    return date ? date.toLocaleDateString() : '';
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

      <Modal
        isOpen={memoModalIsOpen}
        onRequestClose={closeMemoModal}
        contentLabel="메모 추가"
        className={styles.Modal}
        overlayClassName={styles.Overlay}

      >
        <h2>메모 추가</h2>
        <textarea 
          value={memo} 
          onChange={handleMemoChange} 
          maxLength="250"
          placeholder="메모 추가"
        />
        <div>{memo.length}/250자</div>
        <button onClick={handleClearMemo}>모두 지우기</button>
        <button onClick={handleSaveMemo}>저장</button>
      </Modal>

      <Modal
        isOpen={guestModalIsOpen}
        onRequestClose={closeGuestModal}
        contentLabel="게스트 설정"

        className={styles.Modal}
        overlayClassName={styles.Overlay}
      >
        <h2>게스트 설정</h2>
        <div className={styles['guest-counter']}>

          <div>
            <span>성인 (13세 이상)</span>
            <button onClick={() => handleGuestChange('adults', 'decrement')} disabled={adults <= 1}>-</button>
            <span>{adults}</span>
            <button onClick={() => handleGuestChange('adults', 'increment')}>+</button>
          </div>
          <div>
            <span>어린이 (2-12세)</span>
            <button onClick={() => handleGuestChange('children', 'decrement')} disabled={children <= 0}>-</button>
            <span>{children}</span>
            <button onClick={() => handleGuestChange('children', 'increment')}>+</button>
          </div>
          <div>
            <span>유아 (2세 미만)</span>
            <button onClick={() => handleGuestChange('infants', 'decrement')} disabled={infants <= 0}>-</button>
            <span>{infants}</span>
            <button onClick={() => handleGuestChange('infants', 'increment')}>+</button>
          </div>
          <div>
            <span>반려동물</span>
            <button onClick={() => handleGuestChange('pets', 'decrement')} disabled={pets <= 0}>-</button>
            <span>{pets}</span>
            <button onClick={() => handleGuestChange('pets', 'increment')}>+</button>
          </div>
        </div>

        <button className={styles['reset-button']} onClick={handleReset}>다시 설정</button>
        <button className={styles['save-button']} onClick={closeGuestModal}>저장</button>
      </Modal>

      <Modal
        isOpen={dateModalIsOpen}
        onRequestClose={closeDateModal}
        contentLabel="날짜 선택"
        className={styles.Modal}
        overlayClassName={styles.Overlay}
      >
        <h2>날짜 선택</h2>
        <div className={styles['datepicker-container']}>
          <div className={styles['datepicker-wrapper']}>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              monthsShown={2} 
              className={styles.datepicker}
            />
          </div>
        </div>
        <div className={styles['datepicker-button-container']}>
          <button className={styles['reset-button']} onClick={handleReset}>다시 설정</button>
          <button className={styles['save-button']} onClick={closeDateModal}>저장</button>
        </div>
      </Modal>

    </div>
  );
}
