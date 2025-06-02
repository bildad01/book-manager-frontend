// src/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// 도서 목록 조회
export async function fetchBooks() {
  const response = await api.get('/api/v1/books');
  return response.data;
}

// 도서 상세 정보
export const fetchBookDetail = async (id) => {
  try {
    const response = await api.get(`/api/v1/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('도서 상세 정보 조회 실패');
  }
};

// 도서 등록 함수
export const registerBook = async (payload) => {
  try {
    const response = await api.post('/api/v1/books', payload);
    return response.data; // {status, message, ...}
  } catch (error) {
    // 서버에서 에러 메시지를 내려주면 그대로 전달
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('도서 등록 실패');
  }
};

// 도서 삭제 함수
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/api/v1/books/${id}`);
    return response.data; // {status, message, ...} 또는 성공시 204 No Content
  } catch (error) {
    throw new Error('도서 삭제 실패');
  }
};
