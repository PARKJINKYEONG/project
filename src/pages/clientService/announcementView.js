import React, { useEffect, useState } from 'react';
import styles from '../../styles/announcementView.module.css';
import { Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AnnouncementView = () => {
  const { notice_id } = useParams();  // URL 매개변수에서 ID 가져오기
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/notice/${notice_id}`);
        setNotice(response.data);
      } catch (error) {
        console.error('공지사항을 불러오는 중 오류가 발생했습니다.', error);
      }
    };
    fetchNotice();
  }, [notice_id]);

  if (!notice) {
    return <p>Loading...</p>;
  }

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
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{notice.title}</h2>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.value}>제목</td>
                <td className={styles.value}>{notice.title}</td>
              </tr>
              <tr>
                <td className={styles.value}>조회수</td>
                <td className={styles.value}>{notice.viewCount}</td>
              </tr>
              <tr>
                <td className={styles.value}>작성자</td>
                <td className={styles.value}>{notice.writer}</td>
              </tr>
              <tr>
                <td className={styles.value}>등록일</td>
                <td className={styles.value}>{notice.noticeDate.slice(0, 10)}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.noticeContent}>
            <p>{notice.content}</p>
          </div>
        </div>
        <button className={styles.buttonStyle} onClick={() => navigate('/announcement')}>목록</button>
      </div>
    </>
  );
};

export default AnnouncementView;
