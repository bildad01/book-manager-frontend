// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 또는 proxy 사용 시 '/api' 등
});

// 도서 목록 조회 함수
export async function fetchBooks() {
  const response = await api.get('/api/v1/books');
  return response.data; // {status, message, data: [...]}

}

//도서 상세 정보
export const fetchBookDetail = async (id) => {
  try {
    const response = await api.get(`/api/v1/books/${id}`);
    return response.data; // {status, message, data: {bookId: 1, ...}}
  } catch (error) {
    throw new Error('도서 상세 정보 조회 실패');
  }
};
