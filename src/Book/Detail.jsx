import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import Layout from '../components/Layout';
import { fetchBookDetail, deleteBook } from '../api';
 
export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
 
  // 도서 상세 정보 조회
  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true);
        const data = await fetchBookDetail(id);
        console.log('book data:', data); // 이 부분 추가!
        setBook(data);
        setError('');
      } catch (e) {
        setError(e.message || '도서 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);
 
 
  // 도서 삭제 핸들러
  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        setDeleteLoading(true);
        await deleteBook(id);
        alert('도서가 성공적으로 삭제되었습니다!');
        navigate('/books');
      } catch (e) {
        alert(e.message || '도서 삭제에 실패했습니다.');
      } finally {
        setDeleteLoading(false);
      }
    }
  };
 
  // 로딩 상태 처리
  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }
 
  // 에러 상태 처리
  if (error) {
    return (
      <Layout>
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 10 }}>
          <Alert severity="error">{error}</Alert>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </Button>
        </Box>
      </Layout>
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
        {/* 헤더 섹션 */}
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
 
        {/* 메인 콘텐츠 */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {/* 좌측: 메타 정보 */}
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
            <Typography variant="body2" color="text.secondary">
              {book.author}
            </Typography>
          </Box>
 
          {/* 중앙: 상세 내용 */}
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
 
          {/* 우측: 액션 버튼 */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flex: '0 1 180px'
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
            >
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
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress size={24} /> : '도서삭제'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}