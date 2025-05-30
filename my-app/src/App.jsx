import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material';

import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BookList       from './Book/List'
import BookRegister   from './Book/Register'
import BookUpdate     from './Book/Update'
import BookDetails   from './Book/Details'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. 도서 목록 (메인) */}
      
        <Route path="/" element={<BookList />} />

        {/* 2. 도서 등록 */}
        <Route path="/books/register" element={<BookRegister />} />

        {/* 3. 도서 수정 (URL 파라미터로 id 전달) */}
        <Route path="/books/update/:id" element={<BookUpdate />} />

        {/* 4. 도서 상세 & 표지 히스토리 (id 전달) */}
        <Route path="/books/details/:id" element={<BookDetails />} />

        {/* 정의되지 않은 모든 경로는 메인으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}