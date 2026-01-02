// authApi.js
import { api } from "./api.js";

// useMe() 사용자 정의 훅에서 사용
export const ME_QUERY_KEY = ["me"]; // Query Key for fetching current user

// local storage에서 발급 받은 토큰 읽기
export function getToken() {
    return localStorage.getItem("accessToken");
}

// 로그인 성공 후 토큰 저장
export function setAuth(data) {
    console.log("로그인 성공! 서버가 준 데이터:", data); // F12 콘솔에서 확인용

    // 1. 서버가 accessToken, token, access_token 중 뭘로 주든 다 받아내도록 처리
    const token = data.accessToken || data.token || data.access_token;

    if (token) {
        localStorage.setItem("accessToken", token);
        console.log("토큰 저장 완료:", token);
    } else {
        console.error("큰일 났습니다! 토큰을 찾을 수 없습니다. 데이터 구조를 확인하세요:", data);
    }
}

// 로그아웃 시 토큰 삭제
export function clearAuth() {
    localStorage.removeItem("accessToken");
}

// 현재 로그인한 사용자 정보 가져오기
export async function fetchCurrentUser() {
    const response = await api.get("/api/auth/me");
    return response.data; // 현재 사용자 정보 반환
}
/*
localStorage : 웹 브라우저에 데이터를 저장하는 방법 중 하나로, key-value 쌍으로 데이터를 저장합니다.
토큰을 localStorage에 저장하면 사용자가 페이지를 새로고침하거나 브라우저를 닫았다가 다시 열어도 토큰이 유지되어 사용자가 다시 로그인할 필요가 없습니다.
이는 사용자의 편의성을 높이고, 지속적인 인증 상태를 유지하는 데 도움이 됩니다.
*/


// 로그인 요청
export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data; // 로그인 응답 데이터 반환
}

// 회원가입 요청
export async function register({ email, password, nickname }) {
    const response = await api.post("/api/auth/signup", { email, password, nickname });
    return response.data; // 회원가입 응답 데이터 반환
}

// 로그아웃
export async function logout() {
    const response = await api.post("/api/auth/logout");
    return response.data; // 로그아웃 응답 데이터 반환
}