import React, { useState } from 'react';

import QnAstyle from '../../styles/userQna.module.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import UserComponent from './userComponent';

const rows = [
  { no: 4, category: '석석이', title: '공지사항입니다', date: '2020-11-12' },
  { no: 3, category: '덕덕이', title: '비공계인 공지사항입니다', date: '2017-11-22' },
  { no: 2, category: '경경이', title: '안녕하세요', date: '2017-11-22' },
  { no: 1, category: '진진이', title: '안녕하세요 질문합니다', date: '2017-11-22' },
];

function Announcement() {

  const navigate = useNavigate(); // useNavigate 훅 사용

    const handleFAQClick = () => {
        navigate('/userFaq'); // FAQ 페이지로 이동
    };
    
    


    const handleOnclickTitle = (qna) => {
      navigate('/announcement/'+qna.id, {state: qna});
    };
    const handleQNAClick = () => {
        navigate('/userQna'); // QnA 페이지로 이동
    };
    const handleFaqClick = () => {
        navigate('/userFaq'); // eCrm 페이지로 이동
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "90px",
      };
    
    const headerStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
      };
  
    const headerMenuStyle = {
        fontSize: "16px",
        marginBottom: "15px",
      };

    const tabStyle = {
        display: "inline-block",
        marginRight: "15px",
        cursor: "pointer",
        fontWeight: "bold",
      };

    const thStyle = {
        borderBottom: "2px solid black",
        textAlign: "left",
        padding: "8px",
      };
      
      const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      };
      
      const searchBoxStyle = {
        width: "60%", // 크기를 줄였습니다.
        padding: "8px",
        boxSizing: "border-box",
      };
      
      const buttonStyle = {
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#000",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginLeft: "10px", // 버튼과 검색 상자 사이의 간격
      };


    

  return <>
    <div className="qna-container">
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
            <div style={{ padding: "20px" }}>
                <div style={headerStyle}>공지사항</div>
                    <div style={headerMenuStyle}>
                        <span style={tabStyle}>NOTICE</span>
                        <span style={tabStyle} onClick={handleQNAClick}>| Q&A</span>
                        <span style={tabStyle} onClick={handleFAQClick}>| FAQ</span>
                    </div>
                <div style={{ margin: '20px 0' }}>

                <table style={tableStyle}>
                    <thead>
                        <th style={thStyle}>No</th>
                        <th style={thStyle}>작성자</th>
                        <th style={thStyle}>제목</th>
                        <th style={thStyle}>작성시간</th>
                    </thead>
                    <tbody> 
                        {rows.map(row => (
                          <UserComponent row={row} onClick={()=>navigate('/announcementView')} />
                        ))}
                      </tbody>
                </table>
                <div style={containerStyle}>
                    <input
                        type="text"
                        placeholder="Search"
                        style={searchBoxStyle}
                    />
                    <button style={buttonStyle} onClick={()=>navigate('/createUserQnA')}>글쓰기</button>
                </div>
                </div>
            </div>
    </div>
  </>
};

export default Announcement;
