import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMe } from '../../hooks/useMe'; // 1. useMe 커스텀 훅 임포트 (경로 확인 필요)

function PostPagination({ page, totalPages, onPrev, onNext }) {
    // 2. 로그인 정보 가져오기
    const { data: me, isLoading: meIsLoading } = useMe();

    // 3. logined 변수 정의
    const logined = !meIsLoading && !!me;

    return (
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mt: 3 }}>
            {/* 페이지네이션 */}
            <Stack direction='row' alignItems={'center'} spacing={1.8} >
                <Button variant='outlined' size='small'
                    disabled={page === 0}
                    onClick={onPrev}>이전</Button>
                <Typography>{page + 1} / {totalPages}</Typography>
                <Button variant='outlined' size='small'
                    disabled={page + 1 >= totalPages}
                    onClick={onNext}>다음</Button>
            </Stack>

            {/* 새 글 작성 버튼 - 이제 logined가 정의되어 에러가 나지 않습니다 */}
            {
                logined && (
                    <Button component={Link} to='/posts/new'
                        variant='contained' size='small'
                        sx={{ borderRadius: 999, px: 3, fontWeight: 500 }}>
                        새 글 작성
                    </Button>
                )
            }
        </Stack >
    );
}

export default PostPagination;