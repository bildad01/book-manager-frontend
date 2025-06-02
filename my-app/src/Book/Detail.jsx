import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { fetchBookDetail } from '../api'; // 실제 경로에 맞게 import
import { deleteBook } from '../api';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 도서 상세 정보 불러오기
  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetchBookDetail(id);
        setBook(res); // 바로 도서 객체
      } catch (e) {
        setError('도서 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  // 도서 삭제 (API 연동 필요)

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteBook(id); // 여기서 id를 바로 사용!
        alert('삭제 완료!');
        navigate('/books'); // 또는 navigate('/') 등 목록 경로로 이동
      } catch (e) {
        alert(e.message || '삭제 실패');
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 2 }}>뒤로가기</Button>
      </Container>
    );
  }

  if (!book) return null;

  return (
    <Container
      sx={{
        width: '100vw',
        p: 4,
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default'
      }}
    >
      {/* 중앙 정렬된 래퍼 박스 */}
      <Box
        sx={{
          width: '80vw',
          maxWidth: 1200,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 4
        }}
      >
        {/* Indicator 영역 */}
        <Box
          sx={{
            bgcolor: 'primary.light',
            p: 2,
            mb: 4,
            borderRadius: 1,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6">Indicator</Typography>
        </Box>

        {/* 메인 레이아웃 */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap'
          }}
        >
          {/* 좌측: 표지 + 메타 정보 */}
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
              <Typography
                variant="subtitle1"
                sx={{ lineHeight: 1.2, p: 1 }}
              >
                도서 표지
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom>
              제목
            </Typography>
            <Typography variant="h6" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="subtitle1">작가명</Typography>
            <Typography variant="body1" gutterBottom>
              {book.author}
            </Typography>
          </Box>

          {/* 중간: 내용 영역 */}
          <Box
            sx={{
              flex: '2 1 400px',
              minHeight: 400,
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

          {/* 우측: 버튼 열 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flex: '0 1 180px'
            }}
          >
            <Button variant="outlined" size="large" onClick={() => navigate(`/`)}>
              뒤로가기
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(`/book/update/${id}`)}
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
    </Container>
  );
}

