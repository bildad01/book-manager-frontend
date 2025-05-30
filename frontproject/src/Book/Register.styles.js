import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// 전체 컨테이너
export const RegisterContainer = styled(Box)({
  maxWidth: 700,
  margin: '40px auto 0 auto',
});

// 표지 미리보기 영역
export const PreviewPaper = styled(Paper)({
  width: 180,
  height: 260,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16,
  background: '#f5f5f5',
  position: 'relative',
});

// 폼 오른쪽 영역
export const FormBox = styled(Box)({
  flex: 1,
});

// 입력 필드 스타일(필요시)
export const StyledTextField = styled(TextField)({
  marginBottom: 16,
});
