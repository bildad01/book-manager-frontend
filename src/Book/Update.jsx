import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container, CircularProgress, Alert } from '@mui/material';
import Layout from '../components/Layout';
import { api, fetchBookDetail } from '../api';

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put(`/api/v1/books/${id}`, {
        content: content,
        title: book.title,
        author: book.author,
        coverImageUrl: book.coverImageUrl, // 기존 값 그대로 포함!
      });
      alert('수정 완료!!');
      navigate(`/book/details/${id}`);
    } catch (e) {
      alert('서버 연결 실패: ' + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        setLoading(true);
        await api.delete(`/api/v1/books/${id}`);
        alert('삭제 완료!');
        navigate('/');
      } catch (e) {
        alert('삭제 실패: ' + (e.response?.data?.message || e.message));
      } finally {
        setLoading(false);
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
          <Typography variant="h6">📘 도서 수정</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 200px', textAlign: 'center' }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '4/5',
                maxWidth: 300,
                bgcolor: 'grey.200',
                mb: 2,
                mx: 'auto',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {book.coverImageUrl ? (
                <img
                  src={book.coverImageUrl}
                  alt="도서 표지"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Typography variant="subtitle1" sx={{ p: 1 }}>
                  도서 표지
                </Typography>
              )}
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
              borderRadius: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <TextField
              label="내용"
              multiline
              minRows={10}
              maxRows={20}
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                flex: 1,
                '& .MuiInputBase-root': { alignItems: 'flex-start', height: '100%' }
              }}
            />
          </Box>

          <Box
            sx={{
              flex: '0 0 180px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'stretch',
              justifyContent: 'flex-start',
            }}
          >
            <Button variant="outlined" size="large" onClick={() => navigate(-1)} disabled={loading}>
              뒤로가기
            </Button>
            <Button variant="contained" size="large" onClick={handleSave} disabled={loading}>
              수정완료
            </Button>
            <Button
              variant="contained" color="error" size="large" onClick={handleDelete} disabled={loading}>
              도서삭제
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
