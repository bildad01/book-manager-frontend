import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const dummyResponse = {
      status: 'success',
      data: [
        {
          id: 1,
          title: '도서 제목 예시',
          coverImageUrl: 'https://example.com/cover.jpg',
          createdAt: '2025-05-30T11:00:00'
        },
        {
          id: 2,
          title: '다른 도서 제목',
          coverImageUrl: 'https://example.com/cover2.jpg',
          createdAt: '2025-05-29T10:00:00'
        }
      ]
    };
    setBooks(dummyResponse.data);
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  // 수정 페이지 이동 함수
  const handleUpdate = (id) => {
    navigate(`/book/details/${id}`);
  };

  // 삭제 함수 (임시 예시 - 실제 API 요청 필요)
  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setBooks(prev => prev.filter(book => book.id !== id));
      // 실제라면 여기서 API 호출 후 상태 갱신
    }
  };

  return (
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
  );
}

export default BookList;
