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


