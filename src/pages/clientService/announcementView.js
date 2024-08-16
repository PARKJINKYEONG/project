import React, { useState } from 'react';

import QnAstyle from '../../styles/userQna.module.css';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';



function AnnouncementView() {

  const navigate = useNavigate(); // useNavigate 훅 사용

    const handleFAQClick = () => {
        navigate('/userFaq'); // FAQ 페이지로 이동
    };
    const handleeCrmClick = () => {
        navigate('/eCrm'); // eCrm 페이지로 이동
    }
    const {state} = useLocation();

  return <>
    <div className="qna-container">
                <div className={`text-center ${QnAstyle.headerImage}`}>
                    <img src="/images/Mask_group.png" alt="Header" className="header-image" />
                </div>
                <div className="menu" style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <input type="text" placeholder="검색"style={{ width: '800px', height:'45px' }} />
                        <button>검색</button>
                    </div>
                </div>
                <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>   
                    <h2>공지사항 </h2>
                </div> 
                <table className="table">
                    <tbody>
                        <tr>
                            <td colSpan="4"></td>
                        </tr>
                        <tr>
                            <td className="title">제목</td>
                            <td>{state.title}</td>
                            <td className="date col-2">{state.createdAt}</td>  
                        </tr>
                        <tr>
                            <td>글쓴이</td>
                            <td colSpan="2">{state.author}</td>                        
                        </tr>
                        <tr>
                            <td className="text-center" colSpan="5">
                                {state.content}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
                <NavLink to="/announcement">
                        <button style={{ width: '80px', height:'40px', fontSize: '20px' }} >목록</button>
                </NavLink>
            </div>
  </>
};

export default AnnouncementView;
