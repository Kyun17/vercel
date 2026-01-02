import React from 'react';
import { Box, Paper } from '@mui/material'
import PostDetailHeader from '../../components/posts/PostDetailHeader';
import PostDetailContent from '../../components/posts/PostDetailContent';
import PostDetailButtons from '../../components/posts/PostDetailButtons';
import { useNavigate, useParams } from 'react-router';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, fetchPostDetail } from '../../api/postApi';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import PostComments from '../../components/comments/PostComments';
import { useMe } from '../../hooks/useMe';

/*
    URL에서 id를 읽음 -> 서버에서 해당 아이디 데이터 가져옴
    -> 화면 출력
    -> 삭제 버튼 클릭시 삭제 API 호출 -> 목록으로 이동
    -> 수정 버튼 클릭시 -> 수정으로 이동
 */
function PostDetail() {
    const { id } = useParams();
    const postId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 이미지 경로 설정
    const apiBase = import.meta.env.VITE_API_BASE_URL;

    const { data: me, isLoading: meIsLoading } = useMe();

    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostDetail(postId)
    });

    const checkEdit = (authorId) => {
        return (
            !meIsLoading &&
            me?.id != null &&
            authorId != null &&
            Number(me.id) === Number(authorId) // 작성자와 로그인한 사용자가 동일한지 확인
        )

    }

    const deleteMutation = useMutation({
        mutationFn: () => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            navigate('/posts');
        },
        onError: () => {
            alert('삭제에 실패했습니다.')
        }
    });

    if (isLoading) return <Loader />
    if (isError || !post) return <ErrorMessage message='존재하지 않는 게시글입니다' />

    const loginedEdit = checkEdit(post?.author?.id);

    return (
        <Box>
            <Paper sx={{
                width: '100%',
                borderRadius: 3,
                p: 4,
                boxShadow: '0 16px 45px rgba(0,0,0,0.07)'
            }}>
                <PostDetailHeader post={post} />

                <PostDetailContent post={post} apiBase={apiBase} />

                <PostComments postId={postId} />

                <PostDetailButtons id={postId} deleteMutation={deleteMutation} />
            </Paper>
        </Box>
    );
}

export default PostDetail;