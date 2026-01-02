import axios from 'axios';
import { clearAuth } from './authApi';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// 요청 인터셉터 설정
// 서버로 나가는 모든 요청에 JWT 자동 추가
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            clearAuth(); // 토큰 삭제

            if (window.location.pathname.includes('/auth/login')) {
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);