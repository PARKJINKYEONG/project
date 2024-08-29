import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Button, TextField, Grid, Typography, CircularProgress, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DatePicker from 'react-datepicker';
import MuiModal from './../../components/muiModal';

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
  const [favoriteHotel, setFavoriteHotel] = useState(null); // 즐겨찾기할 호텔 정보 저장
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [isFavorite, setIsFavorite] = useState({}); // 호텔별로 즐겨찾기 상태 관리

  const today = new Date();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formattedCheckin = formatDate(checkin);
    const formattedCheckout = formatDate(checkout);

    axios.post('http://localhost:5000/hotel-search', {
      region,
      checkin: formattedCheckin,
      checkout: formattedCheckout,
      adultCount,
      childCount,
    }).then(() => {
      axios.get('http://localhost:8080/api/places/hotels/search', {
        params: {
          address: region,
          checkInDate: formattedCheckin,
          checkOutDate: formattedCheckout,
        },
      }).then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setResults(response.data);
          setError('');
          sortResults(response.data, sortOrder);
        } else {
          setResults([]);
          setError('검색 결과가 없습니다.');
        }
      }).catch((error) => {
        setError('검색 중 오류가 발생했습니다.');
        console.error('호텔 검색 중 오류 발생!', error);
      }).finally(() => {
        setLoading(false);
      });
    }).catch((error) => {
      setError('크롤링 데이터 저장 중 오류가 발생했습니다.');
      console.error('크롤링 데이터 저장 중 오류 발생!', error);
      setLoading(false);
    });
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

  const handleFavoriteClick = (hotel) => {
    setFavoriteHotel(hotel);
    setIsModalOpen(true);
  };

  const handleSaveFavorite = () => {
    setIsFavorite((prev) => ({
      ...prev,
      [favoriteHotel.hotelName]: true,
    }));
    setIsModalOpen(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="지역"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              selected={checkin}
              onChange={(date) => setCheckin(date)}
              minDate={today}
              customInput={
                <TextField
                  fullWidth
                  label="체크인 날짜"
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
              dateFormat="yyyy-MM-dd"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DatePicker
              selected={checkout}
              onChange={(date) => setCheckout(date)}
              minDate={checkin ? new Date(checkin.getTime() + 86400000) : today}
              customInput={
                <TextField
                  fullWidth
                  label="체크아웃 날짜"
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
              dateFormat="yyyy-MM-dd"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="성인"
              value={adultCount}
              onChange={handleAdultCountChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              label="어린이"
              value={childCount}
              onChange={handleChildCountChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{ textAlign: 'right' }}>
            <FormControl fullWidth>
              <InputLabel>정렬 기준</InputLabel>
              <Select
                value={sortOrder}
                onChange={handleSortChange}
              >
                <MenuItem value="rating">평점 순</MenuItem>
                <MenuItem value="price">가격 순</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              호텔 검색
            </Button>
          </Grid>
        </Grid>
      </form>

      {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}

      {error && <Typography color="error">{error}</Typography>}

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        검색 결과:
      </Typography>
      <Grid container spacing={2}>
        {results.map((hotel, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper elevation={2} style={{ padding: '10px', borderRadius: '5px', position: 'relative' }}>
              <IconButton
                style={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleFavoriteClick(hotel)}
              >
                {isFavorite[hotel.hotelName] ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography variant="h6">{hotel.hotelName}</Typography>
              <Typography variant="body1">위치: {hotel.address}</Typography>
              <Typography variant="body1">
                평점: {hotel.averageReviewRate ? hotel.averageReviewRate : '평점 정보 없음'}
              </Typography>
              <Typography variant="body1">가격: {hotel.averagePrice}~</Typography>
              {hotel.imageUrls && hotel.imageUrls.length > 0 && (
                <img src={hotel.imageUrls[0]} alt={hotel.hotelName} width="100" style={{ marginTop: '10px' }} />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 즐겨찾기 모달 */}
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
