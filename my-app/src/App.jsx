//import './App.css'
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './Book/BookList';
import Details from './Book/Details';
import Register from './Book/Register';

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
