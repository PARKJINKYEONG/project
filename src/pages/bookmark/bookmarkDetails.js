import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './bookmarkDetails.css';
//StandaloneSearchBox: 구글 지도의 장소 검색 기능
//사용자가 장소 선택 시 onPlacesChanged가 호출됨
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

Modal.setAppElement('#root'); //모달 사용시 외부 콘텐츠가 비활성화. 즉 내부 콘텐츠에만 포커스가 유지됨

const mapContainerStyle = {
  width: '800px',
  height: '600px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function BookmarkDetails() {
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
  //지도에서 표시할 장소의 위치를 나타내는 state
  const [searchResult, setSearchResult] = useState(center);

  //StandaloneSearchBox가 마운트 될 때 ref가 onLoad에 전달
  const onLoad = ref => {
    setSearchBox(ref);
  };

  //사용자가 검색을 완료했을 때 검색된 장소의 정보를 가져와 SearchResult상태를 업데이트
  const onPlacesChanged = () => {
    const places = searchBox.getPlaces(); //검색된 장소의 배열을 가져옴
    const place = places[0]; //첫번째 장소 
    setSearchResult({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    });
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
  //게스트 추가 혹은 감소
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
  //초기화
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
    return date ? date.toLocaleDateString() : ''; //toLocaleDateString은 각 지역별로 날짜를 표시해줌
  };

  return (
    <div className="bookmark-details">
      <div className="content">
        <h2 className="title">즐겨찾기 이름</h2>
        <div className="button-group">
          <button className="button" onClick={openDateModal}>
            {startDate && endDate ? `${formatDate(startDate)} ~ ${formatDate(endDate)}` : '날짜 입력하기'}
          </button>
          <button className="button" onClick={openGuestModal}>{guestSummary}</button>
        </div>
        <div className="bookmark-list">
          <div className="bookmark-item">
            <div className="bookmark-image-grid">
              <img src="image1.jpg" alt="item1" className="grid-image" />
            </div>
            <div className="bookmark-name">
              <h3>메인화면에서 즐겨찾기할 때 이름</h3>
            </div>
          </div>
          {savedMemo ? (
            <>
              <div className="saved-memo">{savedMemo}</div>
              <button className="memo-button" onClick={openMemoModal}>메모 수정</button>
            </>
          ) : (
            <button className="memo-button" onClick={openMemoModal}>메모 추가</button>
          )}
        </div>
      </div>

      <Modal
        isOpen={memoModalIsOpen} //boolean타입 False면 모달이 닫혀있음
        onRequestClose={closeMemoModal} //모달 외부를 클릭하거나 esc를 눌렀을 때 모달을 닫는 함수
        contentLabel="메모 추가"
        className="Modal"
        overlayClassName="Overlay" //백그라운드 영역에 적용될 CSS클래스 이름
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
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>게스트 설정</h2>
        <div className="guest-counter">
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
        <button className="reset-button" onClick={handleReset}>다시 설정</button>
        <button className="save-button" onClick={closeGuestModal}>저장</button>
      </Modal>

      <Modal
        isOpen={dateModalIsOpen} 
        onRequestClose={closeDateModal} 
        contentLabel="날짜 선택"
        className="Modal"
        overlayClassName="Overlay" 
      >
        <h2>날짜 선택</h2>
        <div className="datepicker-container">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange // boolean타입, 설정 시 사용자가 두개의 날짜를 선택할 수 있음
            inline // boolean타입, 달력이 팝업 형태가 아닌 인라인 형태로 페이지에 직접 렌더링되도록 합니다.
            monthsShown={2} //달력 2개 보임 
          />
        </div>
        <div className="datepicker-button-container">
          <button className="reset-button" onClick={handleReset}>다시 설정</button>
          <button className="save-button" onClick={closeDateModal}>저장</button>
        </div>
      </Modal>

      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyB-COY1Ryjaa2wILZqfl5UoS2WltfYD3Hc" libraries={["places"]}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={searchResult} zoom={10}>
            <Marker position={searchResult} />
          </GoogleMap>
          <div className="search-box-container">
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
              <input type="text" placeholder="검색할 장소를 입력하세요"className="search-box"/>
            </StandaloneSearchBox>
          </div>
        </LoadScript>
      </div>
    </div>
  );
}
