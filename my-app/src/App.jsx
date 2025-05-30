//import './App.css'
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './BookList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/book" />} />
        <Route path="/book" element={<BookList />} />
        <Route path="/book/list" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
