import { Container, Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box sx={{ width: '100%', px: 4, py: 6 }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
