import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { api, fetchBookDetail } from '../api'; // api와 함수 함께 임포트

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [book, setBook] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 도서 데이터 불러오기
  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetchBookDetail(id);
        setBook(res);
        setContent(res.content);
      } catch (e) {
        setError('도서 정보 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  // 수정 완료 처리 함수
  const handleSave = async () => {
    try {
      // API 호출 (예: axios)
      const response = await api.put(`/api/v1/books/${id}`, { 
        content: content,
        title: book.title, // 필요시 추가
        author: book.author // 필요시 추가
      });
      alert('수정 완료!!');
      navigate(`/book/details/${id}`);
      // if (response.data.status === 'success') {
      //   alert('수정 완료!!');
      //   navigate(`/book/details/${id}`);
      // } else {
      //   alert('수정 실패: ' + response.data.message);
      // }
    } catch (e) {
      alert('서버 연결 실패: ' + e.message);
    }
  };


  // 도서 삭제 처리
  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        // 실제 API 호출 코드 (예시)
        // await api.delete(`/api/v1/books/${id}`);
        alert('삭제 완료!');
        navigate('/');
      } catch (e) {
        alert('삭제 실패');
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mt: 2 }}>
          뒤로가기
        </Button>
      </Container>
    );
  }

  if (!book) return null;

  return (
    <Container
      sx={{
        p: 4,
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default'
      }}
    >
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
        <Box
          sx={{
            bgcolor: 'primary.light',
            p: 2,
            mb: 4,
            borderRadius: 1,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6">도서 수정</Typography>
        </Box>

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
              {book.coverImageUrl && book.coverImageUrl !== 'null' ? (
                <img 
                  src={book.coverImageUrl} 
                  alt="도서표지" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Typography variant="subtitle1">도서 표지 없음</Typography>
              )}
            </Box>
            <Typography variant="h5" gutterBottom>
              제목
            </Typography>
            <Typography variant="h6" noWrap>
              {book.title}
            </Typography>
            <Typography variant="subtitle1">작가명</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {book.author}
            </Typography>
          </Box>

          {/* 중간: 내용 영역 */}
          <Box
            sx={{
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'grey.100',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <TextField
              label="내용"
              multiline
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                flex: 1,
                '& .MuiInputBase-root': { alignItems: 'flex-start' },
              }}
            />
          </Box>

          {/* 우측: 버튼 열 */}
          <Box
            sx={{
              flex: '0 0 20%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'stretch',
            }}
          >
            <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
              뒤로가기
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              size="large" 
              onClick={handleDelete}
            >
              도서삭제
            </Button>
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleSave}
            >
              수정완료
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
