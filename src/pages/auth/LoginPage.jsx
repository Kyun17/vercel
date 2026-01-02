import { Box, Stack, Container, Paper, Typography, TextField, Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router';
import { login, setAuth } from '../../api/authApi';

function LoginPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            setAuth(data); // 토큰 저장
            await queryClient.invalidateQueries({ queryKey: ['me'] });
            navigate("/posts"); // 게시판으로 이동
        }
    });

    // 이벤트 핸들러
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const fd = new FormData(evt.currentTarget);
        loginMutation.mutate({
            email: String(fd.get("email")).trim(),
            password: String(fd.get("password")),
        });
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={0}
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    px: 4,
                    py: 3,
                    boxShadow: '0 16px 45px rgba(0,0,0,0.07)'
                }}>

                <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 2 }}>로그인</Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField name="email" type='email' label="이메일" size='small' fullWidth placeholder='test@test.com' required />
                        <TextField type='password' label="비밀번호" size='small' fullWidth name='password' required />

                        {loginMutation.isError && (
                            <Typography variant="body2" color="error">
                                {loginMutation.error.response?.data?.message || "로그인 중 오류가 발생했습니다."}
                            </Typography>
                        )}
                        <Button type='submit' variant='contained' size='large' fullWidth sx={{ mt: 2, py: 1.5, borderRadius: 2 }}>
                            {loginMutation.isPending ? "로그인 중..." : "로그인"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;