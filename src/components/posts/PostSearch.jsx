import { Box, TextField, Button } from '@mui/material';
import React from 'react';



function PostSearch({ keyword, onSubmit, onChangekeyword }) {
    return (
        <Box component="form"
            onSubmit={onSubmit}
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
            <TextField type='search'
                size='small'
                placeholder='제목 또는 내용 검색'
                sx={{ width: 260 }}
                value={keyword}
                onChange={(evt) => onChangekeyword(evt.target.value)} />
            <Button type='submit' size='small' variant='outlined' sx={{
                borderRadius: 999
            }}> 검색 </Button>
        </Box>
    );
}

export default PostSearch;