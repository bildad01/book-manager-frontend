import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom'
import BookUpdate   from './Book/Update'
import BookDetails  from './Book/Details'


const temp = { 
id: 1,
title: "도서 제목 예시",
content: "도서 내용 예시",
coverImageUrl: "https://example.com/cover.jpg",
createdAt: "2025-05-30T11:00:00",
updatedAt: "2025-05-30T11:00:00"
}


import { createBrowserRouter } from 'react-router-dom';
import BookList from './Book/List';
import BookDetail, { bookDetailLoader } from './Book/Detail';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BookList />,
  },
  {
    path: "/books/:id",
    element: <BookDetail />,
    loader: bookDetailLoader,        // params.id 받아 API 호출
    errorElement: <div>오류 발생!</div>,
  },
]);


