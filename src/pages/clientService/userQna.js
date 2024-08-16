import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import QnAstyle from '../../styles/userQna.module.css';

const QnA = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleFAQClick = () => {
        navigate('/userFaq'); // FAQ 페이지로 이동
    };
    const handleeCrmClick = () => {
        navigate('/eCrm'); // eCrm 페이지로 이동
    }
    
    const [qnaList, setQnaList] = useState([]);
    return (
        
        <>
            <div className="qna-container">
                <div className={`text-center ${QnAstyle.headerImage}`}>
                    <img src="/images/Mask_group.png" alt="Header" className="header-image" />
                </div>
                <div className="menu" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <button >Q&A</button>
                        <button onClick={handleFAQClick}>FAQ</button>
                        <button onClick={handleeCrmClick}>신고접수</button>
                    </div>
                    <div>
                        <input type="text" placeholder="검색"style={{ width: '800px', height:'45px' }} />
                        <button>검색</button>
                    </div>
                </div>
                <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>   
                    <h2>Q&A </h2>
                    <NavLink to="/userQna/create">
                        <button style={{ width: '80px', height:'40px', fontSize: '20px' }} >작성</button>
                    </NavLink>
                </div> 
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
                <thead>
                    <tr>
                    <th>글번호</th>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>작성시간</th>
                    </tr>
                </thead>
                <tbody>
                    {qnaList.map((qna) => (
                    <tr key={qna.id}>
                        <td>{qna.id}</td>
                        <td>{qna.title}</td>
                        <td>{qna.author}</td>
                        <td>{qna.createdAt}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </>
    );
};

export default QnA;
