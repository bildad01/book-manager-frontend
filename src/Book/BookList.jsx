import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookList.css';
import Layout from '../components/Layout';
// 백엔드 요청용 axios
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    // 예시시
    const dummyData = Array(10).fill(null).map((_, i) => ({
      id: i + 1,
      title: `도서 제목 예시 ${i + 1}`,
      coverImageUrl: 'https://example.com/cover.jpg',
      createdAt: '2025-05-30T11:00:00'
    }));
    setBooks(dummyData);

    // ✅ [2] 실제 API 연동 (백엔드 완성되면 이 부분 주석 해제)
    /*
    try {
      const res = await axios.get('/api/v1/books');
      if (res.data.status === 'success') {
        setBooks(res.data.data);
      } else {
        console.error('도서 목록 불러오기 실패:', res.data.message);
      }
    } catch (error) {
      console.error('API 오류:', error);
    }
    */
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  const handleUpdate = (id) => {
    navigate(`/book/details/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setBooks(prev => prev.filter(book => book.id !== id));
      // 실제 삭제 API 요청 예시 (백엔드 연동 시 사용)
      /*
      try {
        await axios.delete(`/api/v1/books/${id}`);
        setBooks(prev => prev.filter(book => book.id !== id));
      } catch (e) {
        console.error('삭제 실패:', e);
      }
      */
    }
  };

  return (
    <Layout>
      <div className="book-list-wrapper">
        <div className="book-list-header">
          <h1>도서목록</h1>
          <button className="btn-add" onClick={() => navigate(`/book/register`)}>도서추가</button>
        </div>

        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <div className="book-cover" onClick={() => handleUpdate(book.id)}>
                <img src={book.coverImageUrl} alt="도서표지" />
              </div>
              <div className="book-info">
                <p><strong>도서이름:</strong> {book.title}</p>
                <p><strong>생성일자:</strong> {formatDate(book.createdAt)}</p>
                <div className="book-actions">
                  <button className="btn-update" onClick={() => handleUpdate(book.id)}>수정</button>
                  <button className="btn-delete" onClick={() => handleDelete(book.id)}>삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default BookList;
