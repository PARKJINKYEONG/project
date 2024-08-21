import React, { useState } from 'react';
import axios from 'axios';
import { Checkbox, FormControlLabel, FormGroup, Button, TextField, MenuItem, Typography } from '@mui/material';
import GuestCounter from '../../components/guestCounter';
import MuiModal from '../../components/muiModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FlightSearch() {
  const [tripType, setTripType] = useState('왕복');
  const [startArea, setStartArea] = useState('');
  const [endArea, setEndArea] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [seatClass, setSeatClass] = useState('');
  const [directFlight, setDirectFlight] = useState(false);
  const [guestModalIsOpen, setGuestModalIsOpen] = useState(false);
  const [guestSummary, setGuestSummary] = useState('게스트 1명');
  const [flightResults, setFlightResults] = useState([]);  // 검색 결과를 저장할 상태 추가
  const [error, setError] = useState(null);

  const handleGuestChange = (type, operation) => {
    setPassengers((prev) => {
      const newCount = operation === 'increment' ? prev[type] + 1 : prev[type] - 1;
      return { ...prev, [type]: newCount };
    });
  };

  const openGuestModal = () => {
    setGuestModalIsOpen(true);
  };

  const closeGuestModal = () => {
    const summary = [];
    if (passengers.adults > 0) summary.push(`성인 ${passengers.adults}명`);
    if (passengers.children > 0) summary.push(`어린이 ${passengers.children}명`);
    if (passengers.infants > 0) summary.push(`유아 ${passengers.infants}명`);

    setGuestSummary(summary.join(', ') || '게스트 1명');
    setGuestModalIsOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      tripType,
      startArea,
      endArea,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      passengers,
      seatClass,
      directFlight: directFlight ? '직항' : ''
    };

    axios.post('http://localhost:5000/flight-search', requestData)
    .then((response) => {
      setFlightResults(response.data.flights || []);  // 검색 결과를 상태에 저장
      setError(null);
    })
    .catch((error) => {
      console.error('Error during the flight search', error);
      setError('검색 중 오류가 발생했습니다.');
    });
  };

  const guests = [
    { type: 'adults', label: '성인 (12세 이상)', value: passengers.adults, minValue: 1 },
    { type: 'children', label: '어린이 (2-12세)', value: passengers.children },
    { type: 'infants', label: '유아 (2세 미만)', value: passengers.infants },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={tripType === '편도'}
              onChange={(e) => setTripType(e.target.checked ? '편도' : '왕복')}
            />
          }
          label="편도"
        />
      </FormGroup>
      <TextField
        label="출발지"
        value={startArea}
        onChange={(e) => setStartArea(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="도착지"
        value={endArea}
        onChange={(e) => setEndArea(e.target.value)}
        fullWidth
        margin="normal"
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<TextField label="출발 날짜" fullWidth margin="normal" />}
        dateFormat="yyyy/MM/dd"
      />
      {tripType !== '편도' && (
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          customInput={<TextField label="오는 날짜" fullWidth margin="normal" />}
          dateFormat="yyyy/MM/dd"
        />
      )}
      <Button onClick={openGuestModal} variant="outlined" fullWidth>
        {guestSummary}
      </Button>
      <TextField
        select
        label="좌석 클래스"
        value={seatClass}
        onChange={(e) => setSeatClass(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="일반석">일반석</MenuItem>
        <MenuItem value="프리미엄 일반석">프리미엄 일반석</MenuItem>
        <MenuItem value="비즈니스석">비즈니스석</MenuItem>
        <MenuItem value="일등석">일등석</MenuItem>
      </TextField>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={directFlight}
              onChange={(e) => setDirectFlight(e.target.checked)}
            />
          }
          label="직항"
        />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary">
        검색
      </Button>

      {error && <Typography color="error">{error}</Typography>}  {/* 오류 메시지 출력 */}

      {/* 검색 결과를 표시하는 부분 추가 */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        검색 결과:
      </Typography>
      <ul>
        {flightResults.length > 0 ? (
          flightResults.map((flight, index) => (
            <li key={index}>
              <strong>항공사:</strong> {flight.airline} <br />
              <strong>출발:</strong> {flight.departure.time} ({flight.departure.airport}) <br />
              <strong>도착:</strong> {flight.arrival.time} ({flight.arrival.airport}) <br />
              <strong>경유 정보:</strong> {flight.layover} <br />
              <strong>가격:</strong> {flight.price} <br />
              <hr />
            </li>
          ))
        ) : (
          <Typography>검색 결과가 없습니다.</Typography>
        )}
      </ul>

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
          <Button key="close" onClick={closeGuestModal} variant="contained" color="primary">
            저장
          </Button>
        ]}
      />
    </form>
  );
}

export default FlightSearch;
