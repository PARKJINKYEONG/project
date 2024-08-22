import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from "@mui/material";
import axios from 'axios';
import style from "../../styles/Header.module.css";
import { UserContext } from '../../contexts/userContext';
import { URL } from '../../config/constraint';

const SignOutButton = () => {
  const { accessToken, setAccessToken, setEmail } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${URL.DB}/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 추가
        },
        withCredentials: true, // 쿠키를 함께 전송하려면 추가
      });

    } catch (error) {
      // 로그아웃 요청 실패 시에도 상태 초기화
      console.error('로그아웃 중 오류 발생:', error);
    } finally {
      // 클라이언트 측에서 액세스 토큰 및 이메일 제거
      setAccessToken(null); 
      setEmail(null);
      localStorage.removeItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 제거
      localStorage.removeItem('email'); // 로컬 스토리지에서 이메일 제거

      alert('로그아웃 되었습니다');
    }
  };

  return (
    <Tooltip title="로그아웃">
      <NavLink 
        className={`nav-link ${style.iconStyle}`} 
        to="/" 
        onClick={handleLogout} 
      > 
        Sign Out 
      </NavLink>
    </Tooltip>
  );
};

export default SignOutButton;