import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 임시 더미 데이터
  const book = {
    bookid:id,
    title: `도서 제목 예시 (ID: ${id})`,
    author: '홍길동',
    content:
      '이곳에 도서의 상세 내용을 표시합니다. 내용이 길 경우 Box에 overflow 설정으로 스크롤 지원.',
  };

  return (
    <Container
      sx={{
        p: 4,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default'
      }}
    >
      {/* 중앙 정렬된 래퍼 박스 */}
      <Box
        sx={{
          width: '100%',
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
              onClick={() => navigate(`/books/update/${book.bookid}`)}
            >
              도서수정
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={() => {}}
            >
              도서삭제
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
