// postApi.js
import { api } from './api.js';
// 게시글 목록(전체 조회)
// {page: 0, size: 10, keyword: ""} 서버에서 넘기는 값이 없는 경우 자바스크립트에서 정한 기본값으로 사용
export async function fetchPosts({ page = 0, size = 10, keyword = "" }) {
    const params = { page, size }; // page, size를 쿼리 파라미터에 넣음
    if (keyword && keyword.trim() !== "") {
        params.keyword = keyword; // keyword가 존재하면 쿼리 파라미터에 넣음
    }
    const res = await api.get('api/posts', { params });
    return res.data;
}

// 게시글 상세
export async function fetchPostDetail(id) {
    const res = await api.get(`api/posts/${id}`);
    return res.data;
}

// 게시글 작성
export async function createPost(payload) {
    const res = await api.post('api/posts', payload);
    return res.data;
}

// 게시글 수정
export async function updatePost(id, payload) {
    const res = await api.put(`api/posts/${id}`, payload);
    return res.data;
}

// 게시글 삭제
export async function deletePost(id) {
    const res = await api.delete(`api/posts/${id}`);
    return res.data;
} 