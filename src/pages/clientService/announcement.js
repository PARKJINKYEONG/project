import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/userQna.module.css';
import { Box } from '@mui/material';
import UserComponent from './userComponent';
import axios from 'axios';

const rows = [
  { no: 4, category: '석석이', title: '공지사항입니다', date: '2020-11-12' },
  { no: 3, category: '덕덕이', title: '비공계인 공지사항입니다', date: '2017-11-22' },
  { no: 2, category: '경경이', title: '안녕하세요', date: '2017-11-22' },
  { no: 1, category: '진진이', title: '안녕하세요 질문합니다', date: '2017-11-22' },
];

function Announcement() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);

  const effect = async () => {
    try {
        const notice = await axios.get('http://localhost:8080/api/notice/all/user');
        console.log(notice);
        setNotices(notice.data);  // 질문 목록을 상태에 저장
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
                <div className={styles.headerStyle}>Notice</div>
                <div className={styles.headerMenuStyle}>
                    <Link className={styles.tabStyle} to={'/announcement'}>NOTICE</Link>
                    <Link className={styles.tabStyle} to={"/userQna"}>| Q&A </Link>
                    <Link className={styles.tabStyle} to={"/userFaq"}>| FAQ</Link>
                </div>
                <table className={styles.tableStyle}>
                    <thead className='text-center'>
                        <tr className={styles.thStyle}>
                            <th className='col-1'>번호</th>
                            <th className='col-4 '>제목</th>
                            <th className='col-2'>공지 일자</th>
                            <th className='col-2'>작성자</th>
                            <th className='col-2'>조회수</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {notices.length > 0 ? (
                            notices.map((notice, index) => (
                                <tr key={notice.id}>
                                    <td className="col-1 text-center">{index + 1}</td>
                                    <td className="col-4 text-center">{notice.title}</td>
                                    <td className="col-2 text-center">{notice.noticeDate.slice(0, 10)}</td>
                                    <td className="col-2 text-center">{notice.writer}</td>
                                    <td className="col-1 text-center">{notice.viewCount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className={`text-center ${styles.noData}`}>
                                    등록된 공지 사항이 없습니다.
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
                </div>
            </div>
    </>
  );
}

export default Announcement;
