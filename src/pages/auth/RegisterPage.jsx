import { Box, Button, Stack, TextField, Container, Paper, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router';

function RegisterPage(props) {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        nickname: "",
        password: "",
        rePassword: ""
    });


    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => navigate("/posts")
    });


    // 이벤트 핸들러

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        })); // 기존 폼 상태를 복사하고 변경된 필드만 업데이트
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (password !== rePassword) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        registerMutation.mutate({
            email: form.email.trim(),
            password: form.password,
            nickname: form.nickname.trim(),
        });
    }


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

                {/* 상단 제목 */}
                <Typography variant='h5' sx={{ fontWeight: 600, fontSize: 24, mb: 2 }}>회원 가입</Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField type='email' label="이메일" size='small' fullWidth placeholder='test@test.com' required value={form.email} onChange={handleChange} />
                        <TextField type='text' label="별명" size='small' fullWidth placeholder='별명' required value={form.nickname} onChange={handleChange} />
                        <TextField type='password' label="비밀번호" size='small' fullWidth name='password' required value={form.password} onChange={handleChange} />
                        <TextField type='password' label="비밀번호 확인" size='small' fullWidth name="rePassword" required value={form.rePassword} onChange={handleChange} />
                        {
                            registerMutation.isError && (
                                <Typography variant="body2" color="error">
                                    {registerMutation.error.response?.data?.message || "회원가입 중 오류가 발생했습니다."}
                                </Typography>
                            )
                        }

                        <Button type='submit' variant='contained' size='large' fullWidth sx={{ mt: 2, py: 1.5, borderRadius: 2, transform: "none", "&:hover": { backgroundColor: "#999" } }}>
                            {registerMutation.isPending ? "회원가입 중..." : "회원가입"}
                        </Button>
                    </Stack>

                </Box>


            </Paper>

        </Container >
    );
}

export default RegisterPage;