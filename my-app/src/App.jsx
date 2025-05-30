import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Routes, Route, Router} from "react-router-dom";
import Register from "./Book/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/book/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;