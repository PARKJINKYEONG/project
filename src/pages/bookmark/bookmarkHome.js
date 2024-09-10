import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/bookmarkHome.module.css';
import IconButton from '@mui/material/IconButton';  // IconButton 추가
import CloseIcon from '@mui/icons-material/Close';  // CloseIcon 추가
import axios from 'axios';
import { UserContext } from '../../contexts/userContext';

const BookmarkHome = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('hotel');
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);

  // 드롭다운 선택이 변경될 때마다 즐겨찾기를 가져오는 함수
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bookmark/target', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          params: {
            target: selectedCategory
          },
        });
        console.log('API 응답:', response.data);
        
        const sortedItems = response.data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        setItems(sortedItems);
      } catch (error) {
        console.error('즐겨찾기 가져오기 중 오류 발생!', error);
      }
    };

    fetchBookmarks();
  }, [accessToken, selectedCategory]);

  // 드롭다운 선택 핸들러
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (title, id, name, imageUrls) => {
    navigate(`/bookmark/details/${id}`, { 
      state: { 
        title, 
        name, 
        imageUrls,
        favoriteId: id 
      } 
    });
  };

  // 즐겨찾기 삭제
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookmark/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('즐겨찾기 삭제 중 오류 발생!', error);
    }
  };

  // 날짜별로 그룹화
  const groupedItems = useMemo(() => items.reduce((acc, item) => {
    const dateKey = new Date(item.createDate).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {}), [items]);

  // 날짜를 한글로 변환하는 함수 (요일명을 제외)
  const formatDateToKorean = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // 요일 정보 제거
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    return formatter.format(new Date(dateStr));
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdownContainer}>
        <label htmlFor="category">카테고리 선택: </label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="hotel">호텔</option>
          <option value="food">맛집</option>
        </select>
      </div>

      <div className={styles.bookmarkList}>
        {items.length === 0 ? (
          <p>데이터가 없습니다.</p>
        ) : (
          Object.entries(groupedItems).map(([date, items]) => (
            <div key={date} className={styles.dateGroup}>
              <h4 className={styles.dateTitle}>{formatDateToKorean(date)}</h4>
              <div className={styles.cardContainer}>
                {items.map((item) => (
                  <div key={item.id} className={styles.card} onClick={() => handleCardClick(item.target, item.id, item.hotelName || item.foodName, item.hotelImageUrls || item.foodImageUrls)}>
                    <div className={styles.cardBody}>
                      <div className={styles.images}>
                        {(item.hotelImageUrls && item.hotelImageUrls.length > 0) || (item.foodImageUrls && item.foodImageUrls.length > 0) ? (
                          (item.hotelImageUrls || item.foodImageUrls).map((image, idx) => (
                            <img key={idx} src={image} className="img-thumbnail" alt={`Image ${idx}`} />
                          ))
                        ) : (
                          <p>No images available</p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className={styles.deleteButton}
                      >
                        <IconButton style={{ padding: 0 }}>
                          <CloseIcon style={{ fontSize: 20 }} />
                        </IconButton>
                      </button>
                    </div>
                    <div className={styles.cardFooter}>
                      <h5 className={styles.cardTitle}>
                        {item.hotelName || item.foodName || item.target}
                      </h5>
                      {/* 호텔일 때는 regionName, 맛집일 때는 foodAddress 표시 */}
                      <p className={styles.cardText}>
                        {item.isHotel ? (item.regionName || "지역 정보 없음") : (item.foodAddress || "주소 정보 없음")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookmarkHome;
