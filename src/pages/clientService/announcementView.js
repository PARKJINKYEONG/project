import React from 'react';
import styles from '../../styles/announcementView.module.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AnnouncementView = () => {
  const navigate = useNavigate();
  return (
    <>
    <Box 
                  sx={{ 
                      textAlign: 'center', 
                      mb: 2, 
                      p: 2, 
                      backgroundImage: 'url(/images/QnA.webp)', 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center 50%', 
                      height: 200
                  }}
              >
            </Box>
    <div className={styles.container}>

      <div className={styles.content}>
        <h2 className={styles.title}>공지사항</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.value}>제목</td>
              <td className={styles.value}>공지사항입니다</td>
              <td className={styles.value}>조회수</td>
            </tr>
            <tr>
              <td className={styles.value}>질문자</td>
              <td className={styles.value}>석석이</td>
            </tr>
            <tr>
              <td className={styles.value}>등록일</td>
              <td className={styles.value}>2024-08-11</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.noticeContent}>
          <p>공지사항입니다</p>
          <p>한번씩 읽어주세요</p>
          <p>감사합니다</p>
          <p>많은 관심 부탁드립니다.</p>
        </div>
      </div>
      <button className={styles.buttonStyle} onClick={() => navigate('/announcement')}>목록</button>
    </div>
    </>
  );
};

export default AnnouncementView;
