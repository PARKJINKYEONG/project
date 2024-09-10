import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {
  Paper, Button, TextField, Grid, Typography, CircularProgress,
  InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DatePicker from 'react-datepicker';
import MuiModal from './../../components/muiModal';
import { UserContext } from '../../contexts/userContext';
import useRequest from './../../hooks/useRequest';

function HotelSearch() {
  const [region, setRegion] = useState('');
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('rating');
  const [favoriteHotel, setFavoriteHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState({});
  const [dateError, setDateError] = useState('');
  const [regionError, setRegionError] = useState('');
  const [checkinError, setCheckinError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const { email, accessToken } = useContext(UserContext);
  const today = new Date();
  const { post, del } = useRequest(); // `del` 메서드를 추가

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^0-9.-]/g, '')) || 0;
    }
    return parseFloat(price) || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!region) {
      setRegionError('지역을 입력하세요.');
      return;
    } else {
      setRegionError('');
    }

    if (!checkin) {
      setCheckinError('체크인 날짜를 입력하세요.');
      return;
    } else {
      setCheckinError('');
    }

    if (!checkout) {
      setCheckoutError('체크아웃 날짜를 입력하세요.');
      return;
    } else {
      setCheckoutError('');
    }

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const diffDays = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 31) {
      setDateError('최대 투숙일은 31일입니다.');
      return;
    }

    setDateError('');
    setLoading(true);

    const formattedCheckin = formatDate(checkin);
    const formattedCheckout = formatDate(checkout);

    try {
      await post('http://localhost:5000/hotel-search', {
        region,
        checkin: formattedCheckin,
        checkout: formattedCheckout,
        adultCount,
        childCount,
      },
      {
        skipAuth: true
      });

      const response = await axios.get('http://localhost:8080/api/places/hotels/search', {
        params: {
          address: region,
          checkInDate: formattedCheckin,
          checkOutDate: formattedCheckout,
        },
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        setResults(response.data);
        setError('');
        sortResults(response.data, sortOrder);
      } else {
        setResults([]);
        setError('검색 결과가 없습니다.');
      }
    } catch (error) {
      setError('검색 중 오류가 발생했습니다.');
      console.error('호텔 검색 중 오류 발생!', error);
    } finally {
      setLoading(false);
    }
  };

  const sortResults = (data, order) => {
    const sortedResults = [...data].sort((a, b) => {
      if (order === 'rating') {
        return (b.averageReviewRate || 0) - (a.averageReviewRate || 0);
      } else if (order === 'price') {
        const priceA = parsePrice(a.averagePrice);
        const priceB = parsePrice(b.averagePrice);
        return priceA - priceB;
      }
      return 0;
    });
    setResults(sortedResults);
  };

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    sortResults(results, newSortOrder);
  };

  const handleAdultCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setAdultCount(value);
    } else {
      setAdultCount(0);
    }
  };

  const handleChildCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setChildCount(value);
    } else {
      setChildCount(0);
    }
  };

  const handleFavoriteClick = async (hotel) => {
    if (isFavorite[hotel.id]) {
      // 즐겨찾기 삭제 로직
      try {
        const favoriteId= isFavorite[hotel.id];
        const response = await del(`http://localhost:8080/api/bookmark/${favoriteId}`, {}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          skipAuth: true,
        });

        if (response.status === 200) {
          setIsFavorite((prev) => ({
            ...prev,
            [hotel.id]: false,
          }));
        }
      } catch (error) {
        console.error('즐겨찾기 삭제 중 오류 발생!', error);
      }
    } else {
      // 즐겨찾기 추가 로직
      setFavoriteHotel(hotel);
      setIsModalOpen(true);
    }
  };

  const handleSaveFavorite = async () => {
    if(!email){
      alert('로그인 후 이용하세요');
      return;
    }

    const favoriteData = {
      targetId: favoriteHotel.id,
      isHotel: 1,
      email,
      target: "hotel"
    };

    console.log('targetId:', favoriteData.targetId);

    try {
      const response = await post('http://localhost:8080/api/bookmark', favoriteData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        skipAuth: true,
      });

      if (response.status === 201) {
        const favoriteId= response.data.id;
        setIsFavorite((prev) => ({
          ...prev,
          [favoriteHotel.id]: favoriteId,
        }));
        setIsModalOpen(false);
      } else {
        console.error('즐겨찾기 추가 실패', response.status);
      }
    } catch (error) {
      console.error('즐겨찾기 추가 중 오류 발생!', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* 첫 번째 줄: 성인, 어린이, 정렬 기준, 검색 버튼 */}
          <Grid container item spacing={2} alignItems="center" xs={12} style={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="성인"
                value={adultCount}
                onChange={handleAdultCountChange}
                style={{ height: '45px' }} 
                InputProps={{ style: { height: '45px' } }} 
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="어린이"
                value={childCount}
                onChange={handleChildCountChange}
                style={{ height: '45px' }} 
                InputProps={{ style: { height: '45px' } }} 
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>정렬 기준</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={handleSortChange}
                  label="정렬 기준"
                  style={{ height: '45px' }} 
                >
                  <MenuItem value="rating">평점</MenuItem>
                  <MenuItem value="price">가격</MenuItem>
                </Select>
              </FormControl>
            </Grid>
           
          </Grid>
          {/* 두 번째 줄: 지역, 체크인 날짜, 체크아웃 날짜 */}
          <Grid container item alignItems="center" xs={12}>
            <Grid container item xs={12}>
              <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                <TextField
                  label="지역 *"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  error={!!regionError}
                  helperText={regionError}
                  style={{ width: '150px', height: '45px' }} 
                  InputProps={{ style: { height: '45px' } }} 
                />
                <DatePicker
                  selected={checkin}
                  onChange={(date) => setCheckin(date)}
                  minDate={today}
                  customInput={
                    <TextField
                      fullWidth
                      label="체크인 날짜 *"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <CalendarTodayIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: { height: '45px' } 
                      }}
                      error={!!checkinError}
                      helperText={checkinError}
                    />
                  }
                  dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                  selected={checkout}
                  onChange={(date) => setCheckout(date)}
                  minDate={checkin ? new Date(checkin.getTime() + 86400000) : today}
                  customInput={
                    <TextField
                      fullWidth
                      label="체크아웃 날짜 *"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <CalendarTodayIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: { height: '45px' } 
                      }}
                      error={!!checkoutError}
                      helperText={checkoutError}
                    />
                  }
                  dateFormat="yyyy-MM-dd"
                />
                 <Grid item xs={12} sm={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ width: '70px', height: '40px'}} // 검색 버튼 높이 조정
                    >
                      검색
                    </Button>
                  </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2} style={{ marginTop: '120px' }}>
        {results.map((hotel) => (
          <Grid item xs={12} sm={4} key={hotel.id}>
          <Paper elevation={3} style={{ position: 'relative', padding: '10px', borderRadius: '10px', height: '100%' }}>
            {hotel.imageUrls && hotel.imageUrls.length > 0 && (
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.hotelName}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
              />
            )}
            <Button
              variant="outlined"
              color="primary"
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                borderRadius: '50%',
                padding: '5px',
                minWidth: 'auto',
                backgroundColor: 'transparent', 
                border: 'none', 
                color: isFavorite[hotel.id] ? 'red' : 'red', 
              }}
              onClick={() => handleFavoriteClick(hotel)}
            >
              {isFavorite[hotel.id] ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon style={{ color: 'red' }} />}
            </Button>
            <div style={{ marginTop: '10px' }}>
              <Typography variant="h6" noWrap>{hotel.hotelName}</Typography>
              <Typography variant="body2" color="textSecondary" noWrap>{hotel.regionName}</Typography>
              <Typography variant="body1">평점: {hotel.averageReviewRate}</Typography>
              <Typography variant="body1">가격: {hotel.averagePrice}~</Typography>
            </div>
          </Paper>
        </Grid>
        ))}
      </Grid>
      {favoriteHotel && (
        <MuiModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="즐겨찾기 추가"
          content={
            <TextField
              fullWidth
              label="즐겨찾기 제목"
              defaultValue={favoriteHotel.hotelName}
              InputProps={{ readOnly: true }} 
            />
          }
          actions={
            <Button variant="contained" color="primary" onClick={handleSaveFavorite}>
              저장
            </Button>
          }
        />
      )}
    </Paper>
  );  
}
export default HotelSearch;
