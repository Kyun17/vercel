import React from 'react';
import { Box, CircularProgress } from '@mui/material';

// 인자(props)나 조건문(if)이 필요 없습니다.
// 부모(PostList)가 필요할 때만 이 컴포넌트를 보여주기 때문입니다.
const Loader = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress /> {/* MUI 로딩 스피너 예시 */}
            {/* 또는 그냥 <div>로딩중...</div> */}
        </Box>
    );
};

export default Loader;