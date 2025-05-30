import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BookList() {
  const nav = useNavigate();
  const dummyBooks = [
    { id: 1, title: '첫 번째 책', coverUrl: null },
    { id: 2, title: '두 번째 책', coverUrl: 'https://via.placeholder.com/150' },
    { id: 3, title: '세 번째 책', coverUrl: null },
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">📚 도서 목록</Typography>
        <Button variant="contained" onClick={() => nav('/books/register')}>
          새 도서 등록
        </Button>
      </Box>

      <Grid container spacing={2}>
        {dummyBooks.map(book => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card onClick={() => nav(`/books/details/${book.id}`)} sx={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                height="140"
                image={book.coverUrl || 'https://via.placeholder.com/150'}
              />
              <CardContent>
                <Typography noWrap>{book.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
