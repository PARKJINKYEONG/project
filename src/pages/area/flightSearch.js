import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, FormControlLabel, FormGroup, Button, TextField, MenuItem, Typography, CircularProgress, Checkbox, Grid, Select, InputLabel, FormControl } from '@mui/material';
import GuestCounter from '../../components/guestCounter';
import MuiModal from '../../components/muiModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton'; 
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ScrollToTopButton from '../../components/scrollToTopButton';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

function FlightSearch() {
  const [tripType] = useState('편도');
  const [startArea, setStartArea] = useState('');
  const [endArea, setEndArea] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [seatClass, setSeatClass] = useState('일반석');
  const [directFlight, setDirectFlight] = useState(false);
  const [guestModalIsOpen, setGuestModalIsOpen] = useState(false);
  const [guestSummary, setGuestSummary] = useState('성인 1명');
  const [allFlightResults, setAllFlightResults] = useState([]);
  const [displayedFlights, setDisplayedFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [hasSearched, setHasSearched] = useState(false); 
  const [page, setPage] = useState(1); 
  const [sortOption, setSortOption] = useState('price'); // 정렬 옵션 상태 추가
  const itemsPerPage = 20;

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

    setGuestSummary(summary.join(', '));
    setGuestModalIsOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // 출발지와 도착지를 교환하는 함수
  const swapLocations = () => {
    setStartArea((prevStart) => {
      const tempEnd = endArea; 
      setEndArea(prevStart);   
      return tempEnd;          
    });
  };
  
  // 검색 후 결과를 정렬하는 함수
  const sortFlights = (flights, option) => {
    if (option === 'price') {
      return flights.sort((a, b) => parseFloat(a.price.replace(/[^0-9]/g, '')) - parseFloat(b.price.replace(/[^0-9]/g, '')));
    } else if (option === 'duration') {
      return flights.sort((a, b) => {
        const aTime = parseInt(a.layover.replace(/[^0-9]/g, ''));
        const bTime = parseInt(b.layover.replace(/[^0-9]/g, ''));
        return aTime - bTime;
      });
    }
    return flights;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null);
    setAllFlightResults([]);
    setDisplayedFlights([]);
    setHasSearched(true);
    setPage(1);

    const requestData = {
      tripType, 
      startArea,
      endArea,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      passengers,
      seatClass,
      directFlight: directFlight ? '직항' : '',
    };

    axios.post('http://localhost:5000/flight-search', requestData)
      .then((response) => {
        const sortedFlights = sortFlights(response.data.flights || [], sortOption); // 정렬된 결과
        setAllFlightResults(sortedFlights);
        setError(null);
      })
      .catch((error) => {
        console.error('Error during the flight search', error);
        setError('검색 중 오류가 발생했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const newDisplayedFlights = allFlightResults.slice(startIndex, startIndex + itemsPerPage);
    setDisplayedFlights((prevFlights) => [...prevFlights, ...newDisplayedFlights]);
  }, [page, allFlightResults]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if (displayedFlights.length < allFlightResults.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedFlights]);

  const guests = [
    { type: 'adults', label: '성인 (12세 이상)', value: passengers.adults, minValue: 1 },
    { type: 'children', label: '어린이 (2-12세)', value: passengers.children },
    { type: 'infants', label: '유아 (2세 미만)', value: passengers.infants },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item style={{width: '150px' }}>
              <TextField
                label="출발지"
                value={startArea}
                onChange={(e) => setStartArea(e.target.value)}
              />
            </Grid>
            <Grid item>
              {/* 출발지와 도착지를 교환하는 아이콘 버튼 */}
              <IconButton onClick={swapLocations}>
                <ConnectingAirportsIcon />
              </IconButton>
            </Grid>
            <Grid item style={{ width: '150px' }}>
              <TextField
                label="도착지"
                value={endArea}
                onChange={(e) => setEndArea(e.target.value)}
              />
            </Grid>
            <Grid item style={{ width: '180px' }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={
                  <TextField
                    label="출발 날짜"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <CalendarTodayIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                }
                dateFormat="yyyy/MM/dd"
              />
            </Grid>
            <Grid item style={{marginBottom:'16px', width: '200px', height: '56px' }}>
              <Button onClick={openGuestModal} variant="outlined" style={{ height: '56px' }}>
                {guestSummary}
              </Button>
            </Grid>
            <Grid item style={{marginBottom:'16px', width: '100px', height: '56px', marginLeft:'-100px'}}>
              <Select
                value={seatClass}
                onChange={(e) => setSeatClass(e.target.value)}
                displayEmpty
                variant="outlined"
                style={{ height: '56px', width: '100px' }}
              >
                <MenuItem value="일반석">일반석</MenuItem>
                <MenuItem value="프리미엄 일반석">프리미엄 일반석</MenuItem>
                <MenuItem value="비즈니스석">비즈니스석</MenuItem>
                <MenuItem value="일등석">일등석</MenuItem>
              </Select>
            </Grid>
            <Grid item style={{  width: '100px', marginLeft: '20px' }}>
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
            </Grid>
            <Grid item style={{marginBottom:'16px',  width: '150px', height: '56px' }}>
              <Button type="submit" variant="contained" color="primary" style={{ height: '56px' }}>
                항공권 검색
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {error && <Typography color="error">{error}</Typography>}  

        {/* 정렬 옵션 드롭다운 */}
        <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: '10px' }}>
          <Grid item>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <InputLabel>정렬 기준</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  const sortedFlights = sortFlights(allFlightResults, e.target.value);
                  setDisplayedFlights(sortedFlights.slice(0, itemsPerPage));
                }}
                label="정렬 기준"
              >
                <MenuItem value="price">가격순</MenuItem>
                <MenuItem value="duration">소요시간순</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="h6" style={{ marginTop: '20px' }}>
          검색 결과:
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          hasSearched && (
            <ul style={{ padding: 0, listStyleType: 'none' }}>
              {displayedFlights.length > 0 ? (
                displayedFlights.map((flight, index) => (
                  <li key={index} style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ccc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: '1', textAlign: 'left' }}>
                        <strong>{flight.airline}</strong>
                      </div>

                      <div style={{ flex: '2', textAlign: 'center' }}>
                        <span>{flight.departure.time}</span> <span>{flight.departure.airport}</span>
                        <FlightTakeoffIcon style={{ verticalAlign: 'middle', margin: '0 5px', color:'blue'}} /> 
                        <span>{flight.arrival.time}</span> <span>{flight.arrival.airport}</span>
                      </div>

                      <div style={{ flex: '2', textAlign: 'center', color: flight.layover.includes('직항') ? 'green' : 'orange' }}>
                        {flight.layover}
                      </div>

                      <div style={{ flex: '1', textAlign: 'right', color: 'red', fontWeight: 'bold' }}>
                        {flight.price}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                !error && <Typography>검색 결과가 없습니다.</Typography>
              )}
            </ul>
          )
        )}

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
        <ScrollToTopButton/>
      </form>
    </>
  );
}

export default FlightSearch;
