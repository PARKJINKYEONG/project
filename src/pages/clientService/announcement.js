import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/userQna.module.css';
import { Box } from '@mui/material';
import UserComponent from './userComponent';

const rows = [
  { no: 4, category: '석석이', title: '공지사항입니다', date: '2020-11-12' },
  { no: 3, category: '덕덕이', title: '비공계인 공지사항입니다', date: '2017-11-22' },
  { no: 2, category: '경경이', title: '안녕하세요', date: '2017-11-22' },
  { no: 1, category: '진진이', title: '안녕하세요 질문합니다', date: '2017-11-22' },
];

function Announcement() {
  const navigate = useNavigate();

  const handleFAQClick = () => {
    navigate('/userFaq');
  };

  const handleQNAClick = () => {
    navigate('/userQna');
  };

  const handleFaqClick = () => {
    navigate('/userFaq');
  };

  // useEffect = async () =>{
  //   try {
  //       const qna=await axios.get(`http://localhost:8080/category/${question_category}`);
  //       console.log(qna);

  //       setQuestions(qna);  // 답변 저장 후 목록으로 돌아갑니다.
  //     } catch (error) {
  //       console.error('답변을 저장하는 중 오류가 발생했습니다.', error);
  //     }

  // };

  return (
    <>
      <div className={styles.qnaContainer}>
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
        <div className={styles.paddingContainer}>
          <div className={styles.headerStyle}>공지사항</div>
          <div className={styles.headerMenuStyle}>
            <span className={styles.tabStyle}>NOTICE</span>
            <span className={styles.tabStyle} onClick={handleQNAClick}>| Q&A</span>
            <span className={styles.tabStyle} onClick={handleFAQClick}>| FAQ</span>
          </div>
          <div className={styles.marginContainer}>
            <table className={styles.tableStyle}>
              <thead>
                <tr>
                  <th className={styles.thStyle}>No</th>
                  <th className={styles.thStyle}>작성자</th>
                  <th className={styles.thStyle}>제목</th>
                  <th className={styles.thStyle}>작성시간</th>
                </tr>
              </thead>
              <tbody> 
                {rows.map(row => (
                  <UserComponent row={row} onClick={() => navigate('/announcementView')} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Announcement;
