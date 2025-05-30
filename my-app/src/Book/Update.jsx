import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 임시 더미 데이터
  const book = {
    bookid: id,
    title: `도서 제목 예시 (ID: ${id})`,
    author: '홍길동',
    content:
      '이곳에 도서의 상세 내용을 표시합니다. 수정 가능한 텍스트 박스로 대체되었습니다.',
  };

  // content 상태 관리
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(book.content);
  }, [book.content]);

  const handleSave = () => {
    console.log('Updated content:', content);
    navigate(`/books/details/${id}`);
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

        {/* 메인 레이아웃: 좌(메타), 중(내용), 우(버튼) */}
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
                sx={{ lineHeight: 1.2, p: 1, textAlign: 'center' }}
              >
                도서 표지
              </Typography>
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

          {/* 중간: 내용 영역 (flex로 세로 비율 조정) */}
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

          {/* 우측: 버튼 열 (수직 나열) */}
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
            <Button variant="contained" color="error" size="large" onClick={() => {}}>
              도서삭제
            </Button>
            <Button variant="contained" size="large" onClick={handleSave}>
              수정완료
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
