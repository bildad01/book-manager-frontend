import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookList from './Book/BookList';
import Register from './Book/Register';
import BookUpdate   from './Book/Update';
import BookDetails  from './Book/Detail';

// 필요하면 import './App.css'; 도 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/book" />} />
        <Route path="/book" element={<BookList />} />
        <Route path="/book/list" element={<BookList />} />  
        <Route path="/book/register" element={<Register />} />
        <Route path="/book/update/:id"   element={<BookUpdate />} />
        <Route path="/book/details/:id"  element={<BookDetails />} />
        <Route path="*"                   element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}


export default App;