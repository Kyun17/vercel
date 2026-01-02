// useMe.js

import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser, getToken, ME_QUERY_KEY } from "../api/authApi";

// 로그인 한 사용자 정보를 가져오는 커스텀 훅
export function useMe() {
    const token = getToken();

    return useQuery({
        queryKey: ME_QUERY_KEY,
        queryFn: fetchCurrentUser,
        enabled: !!token, // 토큰이 있을 때만 쿼리 실행
        retry: false, // 실패 시 재시도하지 않음
        staleTime: 5 * 60 * 1000, // 5분 동안 신선한 데이터로 간주
    });
}

