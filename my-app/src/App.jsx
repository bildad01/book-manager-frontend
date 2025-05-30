import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookUpdate   from './Book/Update';
import BookDetails  from './Book/Detail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/book/update/:id"   element={<BookUpdate />} />
        <Route path="/book/details/:id"  element={<BookDetails />} />
        <Route path="*"                   element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
