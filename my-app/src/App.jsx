import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookList from './Book/BookList';
import Details from './Book/Details';
import Register from './Book/Register';
// 필요하면 import './App.css'; 도 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/book" />} />
        <Route path="/book" element={<BookList />} />
        <Route path="/book/list" element={<BookList />} />
        <Route path="/book/details" element={<Details />} />
        <Route path="/book/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
