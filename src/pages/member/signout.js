import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from "@mui/material";
import axios from 'axios';
import style from "../../styles/Header.module.css";
import { UserContext } from '../../contexts/userContext';

const SignOutButton = () => {
  const { accessToken, setAccessToken, setEmail } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://211.109.103.98:8080/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 추가
        },
      });

      setAccessToken(null); // 클라이언트 측에서 액세스 토큰 제거
      setEmail(null);
      alert('로그아웃 되었습니다');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
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
