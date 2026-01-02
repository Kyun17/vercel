import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import PostSearch from '../../components/posts/PostSearch';
import PostTable from '../../components/posts/PostTable';
import PostPagination from '../../components/posts/PostPagination';
import ErrorMessage from '../../components/common/ErrorMessage';
import Loader from '../../components/common/Loader';
import { fetchPosts } from '../../api/postApi';
import { useMe } from '../../hooks/useMe';



function PostList(props) {
    const [page, setPage] = React.useState(0);
    const [keyword, setKeyword] = React.useState("");

    // 조회 Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts', page, keyword],
        queryFn: () => fetchPosts({ page, size: 10, keyword }),
        keepPreviousData: true, // 페이지 전환 시 기존 데이터 유지. 화면 깜빡
    });

    const { data: me, isLoading: meIsLoading } = useMe();

    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <ErrorMessage message="게시글 목록을 불러오는 중 오류가 발생했습니다." />;
    }

    const { content, totalPages } = data;

    // 검색 제출 핸들러
    const handleSearch = (evt) => {
        evt.preventDefault();
        setPage(0); // 검색 시 페이지를 0으로 초기화
    }

    // 이전 페이지 핸들러
    const handlePrev = () => {
        setPage((prev) => Math.max(prev - 1, 0));
    }

    // 다음 페이지 핸들러
    const handleNext = () => {
        setPage((prev) => Math.min(prev + 1, totalPages - 1));
    }

    return (
        <Box sx={{ px: 2, py: 4 }}>
            <Paper elevation={0}
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    px: 4,
                    py: 3,
                    boxShadow: '0 16px 45px rgba(0,0,0,0.07)'
                }}>
                <Box>
                    {/* 상단 제목 */}
                    <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 2 }}>게시글 목록</Typography>
                    {/* 검색 */}
                    <PostSearch
                        keyword={keyword}
                        onChangekeyword={setKeyword}
                        onSubmit={handleSearch} />
                    {/* 테이블 */}
                    <PostTable
                        posts={content} />
                    {/* 페이징 */}
                    <PostPagination page={page}
                        totalPages={totalPages}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        logined={!meIsLoading && !!me} />
                </Box>

            </Paper>
        </Box>
    );
}

export default PostList;