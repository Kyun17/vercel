import React from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMe } from '../../hooks/useMe'; // 1. useMe 임포트

// authorId를 props에 추가로 받아야 본인 확인이 가능합니다.
function PostDetailButtons({ id, deleteMutation, authorId }) {
    // 2. 현재 로그인한 사용자 정보 가져오기
    const { data: me, isLoading: meIsLoading } = useMe();

    // 3. 본인 확인 로직 정의 (loginedEdit 정의)
    const loginedEdit =
        !meIsLoading &&
        me?.id != null &&
        authorId != null &&
        Number(me.id) === Number(authorId);

    return (
        <Stack direction='row' justifyContent="space-between" spacing={1.5} alignItems="center">
            <Button component={Link} to="/posts" variant="outlined" size="small" sx={{ borderRadius: 999, px: 2.5 }}>목록</Button>

            {
                /* 이제 loginedEdit이 정의되어 에러가 나지 않습니다 */
                loginedEdit && (
                    <Stack direction='row' spacing={1}>
                        <Button component={Link} to={`/posts/${id}/edit`} variant="outlined" size="small" sx={{ borderRadius: 999, px: 2.5 }}>수정</Button>
                        <Button
                            variant='contained'
                            color='error'
                            size='small'
                            sx={{ borderRadius: 999, px: 2.5 }}
                            disabled={deleteMutation.isPending}
                            onClick={() => {
                                if (window.confirm('정말 삭제하시겠습니까?')) {
                                    deleteMutation.mutate();
                                }
                            }}
                        >
                            삭제
                        </Button>
                    </Stack>
                )
            }
        </Stack>
    );
}

export default PostDetailButtons;