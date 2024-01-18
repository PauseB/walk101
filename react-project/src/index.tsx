import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from './pages/MainPage';
import PredictionPage from './pages/PredictionPage';


function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path="/prediction/*" element={<PredictionPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RootRouter/>
  </React.StrictMode>
);
