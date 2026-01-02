// header + menu + Outlet

import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router';
import { Box, AppBar, Toolbar, Typography, Container, Stack, Button } from '@mui/material';
import { BiSolidBaguette } from "react-icons/bi";
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';
import { clearAuth } from '../api/authApi';

function AppLayout(props) {
    const queryClient = useQueryClient();
    const { data: me, isLoading: meIsLoading } = useMe();
    const navigate = useNavigate();

    // 로그아웃 이벤트 핸들러
    const handleLogout = () => {
        clearAuth(); // 토큰 삭제
        queryClient.setQueryData(["me"], null); // 사용자 정보 초기화
        navigate("/posts"); // 게시판으로 이동
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <AppBar position='fixed' >
                <Container maxWidth="md">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box component={Link} to="/posts" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#fff' }}>
                            <Box sx={{
                                width: 40, height: 40,
                                borderRadius: '50%',
                                bgcolor: '#fff',
                                display: 'grid',
                                placeItems: 'center',
                                mr: 1.5
                            }}>
                                <BiSolidBaguette style={{ color: '#FAAC68', fontSize: 20 }} />
                            </Box>
                            <Typography variant="h6" component="h1">
                                게시판
                            </Typography>
                        </Box>
                        {/*회원가입 로그인*/}
                        <Stack direction="row" spacing={1.5} alignItems='center' sx={{ marginLeft: 'auto' }}>
                            {
                                !meIsLoading && me ? (
                                    //로그아웃
                                    <Button variant='text' sx={{ color: '#fff' }} onClick={handleLogout}>로그아웃</Button>
                                ) : (
                                    <>
                                        <Button component={Link} to="/auth/login" variant="text" sx={{ color: '#fff' }}>
                                            로그인</Button>
                                        <Button component={Link} to="/auth/register" variant="text" sx={{ color: '#fff', borderColor: '#fff' }}>
                                            회원가입</Button>
                                    </>
                                )
                            }
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth="md" component="main" sx={{ mt: 10, mb: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default AppLayout;