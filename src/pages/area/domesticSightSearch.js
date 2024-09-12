import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from '../../styles/domesticSightSearch.module.css'; 

const DomesticSightSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState({}); // 하트 상태를 관리할 상태 추가

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/domestic-sight-search', { searchQuery: query });
      const searchResults = response.data.results;

      setResults(searchResults);

      // 검색 결과를 바로 DB에 저장
      for (const sight of searchResults) {
        await handleSaveToDB(sight);
      }

    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDB = async (sight) => {
    const sightDTO = {
      sightName: sight.name,
      address: sight.address,
      averageReviewRate: parseFloat(sight.rating),
      lat: parseFloat(sight.latitude || '0'), // 기본값 추가
      lng: parseFloat(sight.longitude || '0'), // 기본값 추가
      region: {
        name: query // 검색어를 region name으로 설정
      },
      imageUrls: sight.imageUrls || [] // 이미지 URL을 리스트로 포함, 기본값 추가
    };

    console.log('Saving to DB:', sightDTO); // console.log 추가

    try {
      const response = await axios.post('http://localhost:8080/api/places/sights/create', sightDTO); 
      if (response.status === 201) {
        console.log(`Sight ${sight.name} 정보가 성공적으로 저장되었습니다.`);
      }
    } catch (error) {
      console.error('DB 저장 중 오류 발생:', error);
    }
  };

  const handleFavoriteToggle = (sight) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [sight.name]: !prevFavorites[sight.name], // 하트 상태를 토글
    }));
  };

  return (
    <div className={styles.container}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="국내 지역, 도시명 검색" 
        className={styles.inputField} 
      />
      <button className={styles.searchButton} onClick={handleSearch}>검색</button>

      {loading && (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      )}

      <div className={styles.cardsContainer}>
        {results
          .filter(result => result.name && result.address) // 유효한 데이터만 필터링
          .map((result, index) => {
            const imageUrl = (result.imageUrls && result.imageUrls[0]) || '/path/to/default/image.jpg'; // 기본 이미지 URL 설정

            return (
              <div className={styles.card} key={index}>
                <img src={imageUrl} alt={result.name} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>{result.name}</div>
                  <div className={styles.cardRank}>순위: {index + 1}위</div>
                  <div className={styles.cardRating}>평점: {result.rating}</div>
                  <div className={styles.cardAddress}>주소: {result.address}</div>
                </div>
                <IconButton 
                  className={styles.favoriteButton} 
                  onClick={() => handleFavoriteToggle(result)}
                >
                  {favorites[result.name] ? 
                    <FavoriteIcon /> : 
                    <FavoriteBorderIcon />
                  }
                </IconButton>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DomesticSightSearch;
