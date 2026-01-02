import React, { use, useEffect, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import PostFormFields from '../../components/posts/PostFormFields';
import PostFormImage from '../../components/posts/PostFormImage';
import PostFormSubmit from '../../components/posts/PostFormSubmit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, fetchPostDetail, updatePost } from '../../api/postApi';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { uploadImage } from '../../api/fileApi';

function PostForm({ mode }) {
    const isEdit = mode === 'edit';
    const queryClient = useQueryClient();
    const navigation = useNavigate();
    const { id } = useParams();
    const postId = Number(id);

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    // 이미지 업로드
    const [imageName, setImageName] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");



    // Tanstack Query ===================
    // 생성
    const createMutation = useMutation({
        mutationFn: createPost, // 게시글 생성 API 함수
        onSuccess: (data) => {
            // 성공 시, 게시글 목록을 다시 불러옵니다.
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            navigation(`/posts/${data.id}`); // 상세 페이지로 이동

        },
        onError: (error) => {
            alert('게시글 생성 실패:', error);
        }
    });

    // 수정일 때 기존 데이터 불러오기
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostDetail(postId),
        enabled: isEdit, // 수정 모드일 때만 실행
        // onSuccess: (data) => {
        //     setTitle(data.title);
        //     setContent(data.content);
        //     setImageName(data.imageName || "");
        // }
    });


    // 수정
    const updateMutation = useMutation({
        mutationFn: (payload) => updatePost(postId, payload), // 게시글 수정 API 함수
        onSuccess: (data) => {
            // 성공 시, 게시글 목록을 다시 불러옵니다.
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: [postId] });
            navigation(`/posts/${data.id}`); // 상세 페이지로 이동
        },
        onError: (error) => {
            alert('게시글 수정 실패:', error);
        }
    });

    // 이미지 업로드 
    const uploadMutation = useMutation({
        mutationFn: (file) => uploadImage(file),
        onSuccess: (result) => {
            setImageUrl(result.imageUrl);
        },
        onError: () => {
            alert('이미지 업로드에 실패했습니다.')
        }
    })

    // side effect: 렌더링 후 정해진 변수의 상태에 따라 실행
    // useEffect(콜백함수, [변수]);
    // useEffect(()=>{},[data]); 한 번만 실행
    useEffect(() => {
        if (isEdit && post) {
            setTitle(post.title);
            setContent(post.content);
            setImageUrl(post.imageUrl || null);
        }
    }, [isEdit, post]);


    // 이벤트 핸들러
    // 이미지 업로드
    const handleImage = (evt) => {
        const file = evt.target.files?.[0];
        if (!file) return;

        setImageName(file.name);

        if (file.size > 1024 * 1024 * 5) {
            alert('이미지는 5MB 이하만 가능합니다.');
            evt.target.value = "";
            return;
        }

        uploadMutation.mutate(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title: title.trim(),
            content: content.trim(),
            imageUrl: imageUrl || null,
        };

        // 필수 값 검증
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        // 이미지 업로드 중이면
        if (uploadMutation.isPending) {
            alert("이미지 업로드 중입니다.");
            return;
        }

        // Props에 따라 mutation 실행
        if (isEdit) {
            updateMutation.mutate(payload); // 수정
        }
        else {
            createMutation.mutate(payload); // 작성
        }
    }

    if (isEdit && isLoading) return <Loader />;
    if (isEdit && isError) return <ErrerMessage message='불러오지 못함' />;

    return (
        <Box sx={{ px: 2, py: 6 }}>
            <Paper sx={{
                width: '100%',
                borderRadius: 3,
                p: 3,
                boxShadow: '0 16px 45px rgba(0,0,0,0.1)'
            }}>
                {/* 제목 */}
                <Typography variant='h6' sx={{ fontWeight: 700, mb: 3 }}>
                    {isEdit ? '게시글 수정' : '새 게시글 작성'}
                </Typography>

                <Box component='form' onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>

                        {/* 입력 필드 */}
                        <PostFormFields
                            title={title}
                            content={content}
                            onChangeTitle={setTitle}
                            onChangeContent={setContent} />

                        {/* 이미지 업로드 */}
                        <PostFormImage
                            imageName={imageName}
                            uploading={uploadMutation.isPending}
                            onChangeImage={handleImage} />

                        {/* 등록, 수정 버튼 */}
                        <PostFormSubmit isEdit={isEdit} />

                    </Stack>

                </Box>

            </Paper>
        </Box>
    );
}

export default PostForm;