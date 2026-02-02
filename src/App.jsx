import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Voca from './pages/Voca';
import Speaking from './pages/Speaking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* 상단 네비 */}
        <nav className="main-nav">
          <Link to="/">홈</Link>
          <Link to="/voca">단어장으로 이동</Link>
          <span className="disabled">독해(준비중)</span>
          <Link to="/speaking">스피킹으로 이동</Link>
        </nav>

        {/* 페이지 */}
        <Routes>
          <Route
            path="/"
            element={
              <header className="home-header">
                <h1>⚡ 가성비 영어 학습 서비스</h1>
                <p>원하는 학습 모드를 선택해봐!</p>
                <Link to="/voca">
                  <button className="nav-btn primary">
                    단어 공부 시작하기
                  </button>
                </Link>
              </header>
            }
          />
          <Route path="/voca" element={<Voca />} />
          <Route path="/speaking" element={<Speaking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
