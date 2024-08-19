import { useCallback } from 'react';
import useTokenReissue from './useTokenReissue';

const useRequest = () => {
  const axiosInstance = useTokenReissue();

  const get = useCallback(
    async (url, params = {}, config = {}) => {
      try {
        const response = await axiosInstance.get(url, {
          ...config,
          params,
        });
        return response.data;
      } catch (error) {
        handleError(error);
        throw error; // 예외를 다시 던져서 호출자에게 알림
      }
    },
    [axiosInstance]
  );

  const post = useCallback(
    async (url, data = {}, config = {}) => {
      try {
        const response = await axiosInstance.post(url, data, config);
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [axiosInstance]
  );

  const put = useCallback(
    async (url, data = {}, config = {}) => {
      try {
        const response = await axiosInstance.put(url, data, config);
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [axiosInstance]
  );

  const del = useCallback(
    async (url, params = {}, config = {}) => {
      try {
        const response = await axiosInstance.delete(url, {
          ...config,
          params,
        });
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [axiosInstance]
  );

  const handleError = (error) => {
    console.error('API 요청 중 오류 발생:', error);
    // 추가적인 예외 처리 로직을 여기에 추가할 수 있음
  };

  return { get, post, put, del };
};

export default useRequest;
