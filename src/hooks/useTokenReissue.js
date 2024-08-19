import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { URL } from '../config/constraint';

const useTokenReissue = () => {
  const { accessToken, setAccessToken } = useContext(UserContext);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: URL.DB,
    withCredentials: true, // 쿠키를 자동으로 전송
  });

  // 요청 인터셉터 설정
  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터 설정
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 액세스 토큰이 만료된 경우
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // 리프레시 토큰을 사용해 새로운 액세스 토큰을 발급받음
          const response = await axiosInstance.post('/reissue', null, {
            withCredentials: true,
          });

          if (response.headers['authorization']) {
            const newAccessToken = response.headers['authorization'].split(' ')[1];
            setAccessToken(newAccessToken);

            // 새로운 액세스 토큰으로 원래의 요청을 다시 시도
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (reissueError) {
          // 재발급 실패 시 로그아웃 처리 또는 오류 처리
          console.error('토큰 재발급 실패:', reissueError);
          navigate('/user/signin'); // 로그인 페이지로 이동
          return Promise.reject(reissueError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useTokenReissue;