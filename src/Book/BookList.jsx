import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookList.css';
import Layout from '../components/Layout'; // ✅ Layout 포함
import { fetchBooks as fetchBooksAPI, deleteBook } from '../api';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const result = await fetchBooksAPI();
      if (Array.isArray(result)) {
        setBooks(result);
      } else if (result.status === 'success') {
        setBooks(result.data);
      } else {
        alert('도서 목록을 불러오지 못했습니다.');
      }
    } catch (error) {
      alert('서버와 통신 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  const handleUpdate = (id) => {
    navigate(`/book/update/${id}`); // ✅ update 경로로 통일
  };

  const handleDetail = (id) => {
    navigate(`/book/details/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteBook(id);
        setBooks((prev) => prev.filter((book) => book.id !== id));
      } catch (e) {
        alert(e.message || '삭제 실패');
      }
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
            <div className="book-card" key={book.bookId}>
              <div className="book-cover" onClick={() => handleDetail(book.bookId)}>
                {book.coverImageUrl && (
                  <img src={book.coverImageUrl} alt="도서 표지" />
                )}
              </div>
              <div className="book-info">
                <p><strong>도서이름:</strong> {book.title}</p>
                <p><strong>생성일자:</strong> {formatDate(book.createdAt)}</p>
                <div className="book-actions">
                  <button className="btn-update" onClick={() => handleUpdate(book.bookId)}>수정</button>
                  <button className="btn-delete" onClick={() => handleDelete(book.bookId)}>삭제</button>
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
