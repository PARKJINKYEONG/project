import React, { useState, useEffect } from 'react';
import styles from '../../styles/bookmarkRecentlyViewd.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import MuiModal from '../../components/muiModal';
import TextField_ from '../../components/textField';


const itemsData = [
  {
    id: '1',
    title: '페라리 박물관에서 보내는 하루',
    date: '2023-07-31',
    host: 'Marc Gené 님',
    image: 'path/to/image1.jpg',
  },
  {
    id: '2',
    title: '오르세 미술관에서 맞이하는 아침',
    date: '2023-07-30',
    host: 'Mathieu Lehanneur 님',
    image: 'path/to/image2.jpg',
  },
  {
    id: '3',
    title: '거실에서 펼쳐지는 도자 캣의 단독 공연',
    date: '2023-07-30',
    host: 'Doja Cat 님',
    image: 'path/to/image3.jpg',
  },
  {
    id: '4',
    title: '카비 라메와 게임 즐기기',
    date: '2023-07-30',
    host: 'Khaby Lame 님',
    image: 'path/to/image4.jpg',
  }
];

const groupByDate = (items) => {
  return items.reduce((groups, item) => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
};

const BookmarkRecentlyViewed = ({ onAddBookmark }) => {
  const [open, setOpen] = useState(false);
  const [bookmarkTitle, setBookmarkTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    const sortedItems = [...itemsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    setGroupedItems(groupByDate(sortedItems));
  }, []);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setBookmarkTitle(item.title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBookmarkTitle('');
  };

  const handleSaveBookmark = () => {
    if (bookmarkTitle === '') {
      alert('즐겨찾기 제목을 입력해주세요.');
      return;
    }

    const newItem = {
      id: selectedItem.id,
      title: bookmarkTitle,
      date: selectedItem.date,
      images: [selectedItem.image],
    };

    setFavorites((prev) => ({
      ...prev,
      [selectedItem.id]: true,
    }));

    onAddBookmark(newItem);
    console.log("Bookmark Added:", newItem);
    handleClose();
  };

  const toggleFavorite = (item) => {
    const isFavorite = favorites[item.id];

    if (isFavorite) {
      setFavorites((prev) => ({
        ...prev,
        [item.id]: false,
      }));
    } else {
      handleOpen(item);
    }
  };

  return (
    <div className={styles.recentlyViewedContainer}>
      {Object.keys(groupedItems).map(date => (
        <div key={date} className={styles.dateGroup}>
          <h2 className={styles.dateTitle}>{date}</h2>
          <div className={styles.cardGroup}>
            {groupedItems[date].map(item => (
              <div key={item.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  {favorites[item.id] ? (
                    <FavoriteIcon 
                      className={styles.favoriteIcon} 
                      onClick={() => toggleFavorite(item)} 
                      style={{ color: 'red' }} 
                    />
                  ) : (
                    <FavoriteBorderIcon 
                      className={styles.favoriteIcon} 
                      onClick={() => toggleFavorite(item)} 
                    />
                  )}
                </div>
                <img src={item.image} alt={''} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDate}>{item.date}</p>
                  <p className={styles.cardHost}>호스트: {item.host}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <MuiModal open={open} onClose={handleClose} title="즐겨찾기 추가"
        content={<TextField_ label="즐겨찾기 제목" value={bookmarkTitle} 
            onChange={(e) => setBookmarkTitle(e.target.value)} />}
        actions={
          <Button variant="contained" color="primary" onClick={handleSaveBookmark}>
            저장
          </Button>}
      />
    </div>
  );
};

export default BookmarkRecentlyViewed;
