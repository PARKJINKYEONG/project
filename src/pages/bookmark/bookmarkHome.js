import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/bookmarkHome.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { UserContext } from '../../contexts/userContext';

const BookmarkHome = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);

  // 데이터베이스에서 즐겨찾기 가져오기
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bookmark/all', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const sortedItems = response.data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        setItems(sortedItems);
      } catch (error) {
        console.error('즐겨찾기 가져오기 중 오류 발생!', error);
      }
    };

    fetchBookmarks();
  }, [accessToken]);

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = (title, id, hotelName, hotelImageUrls) => {
    if (title === '최근 조회') {
      navigate('/bookmark/recently-viewed');
    } else {
      navigate(`/bookmark/details/${id}`, { 
        state: { 
          title, 
          hotelName, 
          hotelImageUrls,
          favoriteId: id 
        } 
      });
    }
  };

  // 즐겨찾기 삭제
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookmark/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      // 삭제 후 상태 업데이트
      setItems((prevItems) => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('즐겨찾기 삭제 중 오류 발생!', error);
    }

  };

  // 날짜별로 그룹화하고, 각 날짜별로 최대 3개의 항목만 반환
  const groupedItems = items.reduce((acc, item) => {
    const dateKey = new Date(item.createDate).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    if (acc[dateKey].length < 3) {
      acc[dateKey].push(item);
    }
    return acc;
  }, {});

  // 날짜를 한글로 변환하는 함수
  const formatDateToKorean = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    return formatter.format(new Date(dateStr));

  };

  return (
    <div className={styles.container}>
      <div className="row">
        {Object.entries(groupedItems).map(([date, items]) => (
          <React.Fragment key={date}>
            <h4>{formatDateToKorean(date)}</h4> {/* 날짜를 한글로 표시 */}
            {items.map((item) => (
              <div key={item.id} className="col-md-4 mb-4" onClick={() => handleCardClick(item.target, item.id, item.hotelName, item.hotelImageUrls)}>
                <div className={`card h-100 ${styles.card}`}>
                  <div className={`card-body ${styles.cardBody}`}>
                    <div className={`mb-2 ${styles.images}`}>
                      {item.hotelImageUrls && item.hotelImageUrls.length > 0 ? (
                        item.hotelImageUrls.map((image, idx) => (
                          <img key={idx} src={image} className="img-thumbnail" alt={`Hotel ${idx}`} />
                        ))
                      ) : (
                        <p>No images available</p> // 이미지가 없는 경우 표시
                      )}
                    </div>
                    {item.target !== 'recently-viewed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className={styles.deleteButton}
                      >
                        <ClearIcon style={{ fontSize: 20 }} />
                      </button>
                    )}
                  </div>
                  <div className={`card-footer ${styles.cardFooter}`}>
                    <h5 className={`card-title ${styles.cardTitle}`}>
                      {item.hotelName || item.target}
                    </h5>
                    <p className={`card-text ${styles.cardText}`}>
                      {item.regionName || item.createDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookmarkHome;
