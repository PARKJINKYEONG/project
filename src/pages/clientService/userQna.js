import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/userQna.module.css';
import { Box } from '@mui/material';
import axios from 'axios';

const QnA = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);


    const effect = async () => {
        try {
            const qna = await axios.get('http://localhost:8080/api/ask/all');
            console.log(qna);
            setQuestions(qna.data);  // 질문 목록을 상태에 저장
        } catch (error) {
            console.error('질문 목록을 불러오는 중 오류가 발생했습니다.', error);
        }
    };

    useEffect(() => {
        effect();
    }, []); 

    return (
        <>
            <Box 
                sx={{ 
                    textAlign: 'center', 
                    mb: 2, 
                    p: 2, 
                    backgroundImage: 'url(/images/hot-air-balloon.jpg)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center 50%', 
                    height: 250,
                    marginTop:10
                }}
            />
            <div className={styles.qnaContainer}>
                <div className={styles.headerStyle}>Q&A</div>
                <div className={styles.headerMenuStyle}>
                    <Link className={styles.tabStyle} to={'/announcement'}>NOTICE</Link>
                    <Link className={styles.tabStyle} to={"/userQna"}>| Q&A </Link>
                    <Link className={styles.tabStyle} to={"/userFaq"}>| FAQ</Link>
                </div>
                <table className={styles.tableStyle}>
                    <thead className='text-center'>
                        <tr className={styles.thStyle}>
                            <th className='col-1'>번호</th>
                            <th className='col-2'>유형</th>
                            <th className='col-4 '>문의 제목</th>
                            <th className='col-2'>문의 일자</th>
                            <th className='col-2'>작성자</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {questions.length > 0 ? (
                            questions.map((question, index) => (
                                <tr key={question.id}>
                                    <td className="col-1 text-center">{index + 1}</td>
                                    <td className="col-2 text-center">{question.questionCategory.questionCategoryName}</td>
                                    <td className="col-4 text-center">{question.questionTitle}</td>
                                    <td className="col-2 text-center">{question.questionDate.slice(0, 10)}</td>
                                    <td className="col-2 text-center">{question.user.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className={`text-center ${styles.noData}`}>
                                    등록된 문의 사항이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
                <div className={styles.containerStyle}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={styles.searchBoxStyle}
                    />
                    <button className={styles.buttonStyle}>검색</button>
                    <button className={styles.buttonStyle} onClick={() => navigate('/createUserQnA')}>문의하기</button>
                </div>
            </div>
        </>
    );
};

export default QnA;