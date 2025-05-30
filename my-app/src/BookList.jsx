import './BookList.css';
//import placeholder from '../assets/book-placeholder.png'; // 도서표지 이미지

const dummyBooks = [
  { title: 'React Handbook', createdAt: '2024-01-01' },
  { title: 'Clean Code', createdAt: '2023-08-15' },
  { title: 'Refactoring UI', createdAt: '2022-12-31' },
  { title: 'JavaScript: The Good Parts', createdAt: '2021-10-10' },
];

function BookList() {
  return (
    <div className="book-list-wrapper">
      <div className="book-list-header">
        <h1>도서목록</h1>
        <button className="btn-add">도서추가</button>
      </div>

      <div className="book-grid">
        {dummyBooks.map((book, idx) => (
          <div className="book-card" key={idx}>
            <div className="book-cover">
              <img alt="도서표지" />
            </div>
            <div className="book-info">
              <p><strong>도서이름:</strong> {book.title}</p>
              <p><strong>생성일자:</strong> {book.createdAt}</p>
              <div className="book-actions">
                <button className="btn update">수정</button>
                <button className="btn delete">삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
