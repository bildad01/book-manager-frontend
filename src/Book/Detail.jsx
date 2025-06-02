import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Layout from '../components/Layout';
import axios from 'axios'; // 

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = {
    bookid: id,
    title: `도서 제목 예시 (ID: ${id})`,
    author: '홍길동',
    content:
      '이곳에 도서의 상세 내용을 표시합니다. 내용이 길 경우 Box에 overflow 설정으로 스크롤 지원.',
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      navigate('/books'); // 도서 목록 페이지로 이동
    }
  };



  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 4
        }}
      >
        <Box
          sx={{
            bgcolor: 'primary.light',
            p: 2,
            mb: 4,
            borderRadius: 1,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6">📖 도서 상세 보기</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap'
          }}
        >          
        <Box
            sx={{
              flex: '1 1 200px',
              textAlign: 'center'
            }}
          >
            <Box
              sx={{
                width: '100%',
                aspectRatio: '4/5',
                maxWidth: 300,
                bgcolor: 'grey.200',
                mb: 2,
                mx: 'auto',
                borderRadius: 1
              }}
            >
              <Typography variant="subtitle1" sx={{ lineHeight: 1.2, p: 1 }}>
                도서 표지
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom noWrap>
              {book.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              작가명
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {book.author}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: '2 1 400px',
              minHeight: 375,
              maxHeight: 375,
              bgcolor: 'grey.100',
              p: 2,
              overflow: 'auto',
              borderRadius: 1
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              {book.content}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flex: '0 1 180px'
            }}
          >
            <Button variant="outlined" size="large" onClick={() => navigate('/')}>
              뒤로가기
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(`/book/update/${book.bookid}`)}
            >
              도서수정
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={handleDelete} 
            >
              도서삭제
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
