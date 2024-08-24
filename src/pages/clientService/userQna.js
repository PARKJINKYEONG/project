import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import QnAstyle from '../../styles/userQna.module.css';
import { Box, Typography } from '@mui/material';
import UserComponent from './userComponent';

const QnA = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const tableStyle = {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "90px",
    };
  
    const thStyle = {
      borderBottom: "2px solid black",
      textAlign: "left",
      padding: "8px",
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

      const handleNoticeClick = () => {
        navigate('/announcement'); // FAQ 페이지로 이동
      };
      const handleFaqClick = () => {
          navigate('/userFaq'); // eCrm 페이지로 이동
      };
      const rows = [
          { no: 4, category: '로그인관련', title: '로그인 안될시 해결 방법', date: '2020-11-12' },
          { no: 3, category: '이용방법', title: '쿠키제거 불가이거나 없는 경우 요청 방법', date: '2017-11-22' },
          { no: 2, category: '이용방법', title: '플레너 이용 방법', date: '2017-11-22' },
          { no: 1, category: '계정', title: '비밀번호 찾는 방법', date: '2017-11-22' },
      ];
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
           
            <div style={{ padding: "20px" }}>
                <div style={headerStyle}>Q&A</div>
                <div style={headerMenuStyle}>
                    <span style={tabStyle} onClick={handleNoticeClick}>NOTICE</span>
                    <span style={tabStyle}>| Q&A</span>
                    <span style={tabStyle} onClick={handleFaqClick}>| FAQ</span>
                </div>

                <table style={tableStyle}>
                    <thead>
                        <tr>
                        <th style={thStyle}>No</th>
                        <th style={thStyle}>카테고리</th>
                        <th style={thStyle}>제목</th>
                        <th style={thStyle}>작성시간</th>
                        </tr>
                    </thead>
                      <tbody> 
                        {rows.map(row => (
                          <UserComponent row={row} onClick={()=>navigate('/qnaView')} />
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
        </>
    );
};

export default QnA;
