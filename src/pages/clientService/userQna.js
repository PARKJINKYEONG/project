import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/userQna.module.css';
import { Box } from '@mui/material';
import UserComponent from './userComponent';
import axios from 'axios';

const QnA = () => {
    const navigate = useNavigate();
    const [questions,setQuestions] = useState(null);

    const handleNoticeClick = () => {
        navigate('/announcement'); // 공지사항 페이지로 이동
    };
    const handleFaqClick = () => {
        navigate('/userFaq'); // FAQ 페이지로 이동
    };

    // const rows = [
    //     { no: 4, category: '로그인관련', title: '로그인 안될시 해결 방법', date: '2020-11-12' },
    //     { no: 3, category: '이용방법', title: '쿠키제거 불가이거나 없는 경우 요청 방법', date: '2017-11-22' },
    //     { no: 2, category: '이용방법', title: '플레너 이용 방법', date: '2017-11-22' },
    //     { no: 1, category: '계정', title: '비밀번호 찾는 방법', date: '2017-11-22' },
    // ];

    useEffect(() =>{
        const effect =async()=>{
            try {
                const qna=await axios.get(`http://localhost:8080/api/ask/all`);
                console.log(qna);
                setQuestions(qna);  // 답변 저장 후 목록으로 돌아갑니다.
            } catch (error) {
                console.error('답변을 저장하는 중 오류가 발생했습니다.', error);
            }
        };
        effect();
    });

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
           
            <div className={styles.qnaContainer}>
                <div className={styles.headerStyle}>Q&A</div>
                <div className={styles.headerMenuStyle}>
                    <span className={styles.tabStyle} onClick={handleNoticeClick}>NOTICE</span>
                    <span className={styles.tabStyle}>| Q&A</span>
                    <span className={styles.tabStyle} onClick={handleFaqClick}>| FAQ</span>
                </div>

                <table className={styles.tableStyle}>
                    <thead>
                        <tr>
                            <th className={styles.thStyle}>No</th>
                            <th className={styles.thStyle}>카테고리</th>
                            <th className={styles.thStyle}>제목</th>
                            <th className={styles.thStyle}>작성시간</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {questions && questions.map(row => (
                            <UserComponent row={row} onClick={() => navigate('/qnaView')} key={row.no} />
                        ))}
                    </tbody>
                </table>
                
                <div className={styles.containerStyle}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.searchBoxStyle}
                    />
                    <button className={styles.buttonStyle} onClick={() => navigate('/createUserQnA')}>검색</button>
                    <button className={styles.buttonStyle} onClick={() => navigate('/createUserQnA')}>글쓰기</button>
                </div>
            </div>
        </>
    );
};

export default QnA;
