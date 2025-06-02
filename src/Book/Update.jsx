import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import Layout from '../components/Layout';

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = {
    bookid: id,
    title: `도서 제목 예시 (ID: ${id})`,
    author: '홍길동',
    content:
      '이곳에 도서의 상세 내용을 표시합니다. 수정 가능한 텍스트 박스로 대체되었습니다.',
  };

  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(book.content);
  }, [book.content]);

  const handleSave = () => {
    console.log('Updated content:', content);
    navigate(`/book/details/${id}`);
  };
  const handleDelete = () => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    navigate('/books'); // 도서 목록으로 이동
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
        {/* Indicator */}
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

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap'
          }}
        >
          {/* 표지 + 메타 정보 */}
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

          {/* 내용 수정 영역 */}
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
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                flex: 1,
                '& .MuiInputBase-root': { alignItems: 'flex-start', height: '100%' }
              }}
            />
          </Box>


          {/* 버튼 영역 */}
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
            <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
              뒤로가기
            </Button>
            <Button variant="contained" size="large" onClick={handleSave}>
              수정완료
            </Button>
            <Button
              variant="contained" color="error" size="large" onClick={handleDelete}>
              도서삭제
            </Button>

          </Box>


        </Box>
      </Box>
    </Layout>
  );
}
