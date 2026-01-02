import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Chip } from '@mui/material';
import { Link } from 'react-router';
import React from 'react';
import dayjs from 'dayjs';

function PostTable({ posts }) {
    const lists = posts ? posts : [];

    return (
        <TableContainer>
            <Table>
                {/* 테이블 머릿말 */}
                <TableHead>
                    <TableRow sx={{
                        '& th': {
                            fontSize: 14,
                            fontWeight: 600,


                        }
                    }}>
                        <TableCell align='center' width='90'>번호</TableCell>
                        <TableCell width='40'>제목</TableCell>
                        <TableCell align='center' width='160'>작성자</TableCell>
                        <TableCell align='center' width='80'>조회수</TableCell>
                        <TableCell align='center' width='80'>작성일</TableCell>
                    </TableRow>
                </TableHead>
                {/* 테이블 본문 */}
                <TableBody>
                    {lists.map(({ id, title, author, readCount, createAt }) => (
                        <TableRow key={id} hover>
                            <TableCell align='center'>{id}</TableCell>
                            <TableCell>
                                <Typography component={Link} to={`/posts/${id}`} sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'orange' } }}>
                                    {title}
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                {author?.nickname && author.nickname !== '작성자' ? (
                                    <Chip label={author.nickname} size="small"
                                        sx={{
                                            bgcolor: 'orange', borderRadius: 999, px: 2,
                                            fontWeight: 500, color: 'white',
                                            height: 30
                                        }} />) : (<Typography sx={{ fontSize: 14 }}>{author?.nickname || '??'}</Typography>)}
                            </TableCell>
                            <TableCell align='center'>{readCount}</TableCell>
                            <TableCell align='center' sx={{ color: '#b6b8bcff' }}>{dayjs(createAt).format('YY년MM월DD일 HH:mm')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PostTable;