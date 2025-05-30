import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookList     from './Book/List';
import BookUpdate   from './Book/Update';
import BookDetails  from './Book/Detail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                   element={<BookList  /> } />
        <Route path="/Books/update/:id"   element={<BookUpdate />} />
        <Route path="/Books/details/:id"  element={<BookDetails />} />
        <Route path="*"                   element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}