import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Book/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;