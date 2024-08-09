
import React from 'react';
import styles from '../../styles/bookmarkRecentlyViewd.module.css';

const items = [
  {
    id: '1',
    title: '페라리 박물관에서 보내는 하루',
    date: '7월 31일 수요일',
    host: 'Marc Gené 님',
    image: 'path/to/image1.jpg',
  },
  {
    id: '2',
    title: '오르세 미술관에서 맞이하는 아침',
    date: '7월 30일 화요일',
    host: 'Mathieu Lehanneur 님',
    image: 'path/to/image2.jpg',
  },
  {
    id: '3',
    title: '거실에서 펼쳐지는 도자 캣의 단독 공연',
    date: '7월 30일 화요일',
    host: 'Doja Cat 님',
    image: 'path/to/image3.jpg',
  },
  {
    id: '4',
    title: '카비 라메와 게임 즐기기',
    date: '7월 30일 화요일',
    host: 'Khaby Lame 님',
    image: 'path/to/image4.jpg',
  }
];

const BookmarkRecentlyViewed = () => {
  return (
    <div className={styles.recentlyViewedContainer}>
      {items.map(item => (
        <div key={item.id} className={styles.card}>
          <img src={item.image} alt={item.title} className={styles.cardImage} />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDate}>{item.date}</p>
            <p className={styles.cardHost}>호스트: {item.host}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkRecentlyViewed;

