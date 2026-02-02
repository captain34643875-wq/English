import React, { useState } from 'react';
import '../App.css';

const studyData = [
  { id: 1, eng: "Action speaks louder than words.", kor: "말보다 행동이 중요하다." },
  { id: 2, eng: "Better late than never.", kor: "늦더라도 안 하는 것보다 낫다." },
  { id: 3, eng: "Practice makes perfect.", kor: "연습이 완벽을 만든다." }
];

function Voca() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentData = studyData[currentIndex];

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const tts = new SpeechSynthesisUtterance(text);
    tts.lang = 'en-US';
    window.speechSynthesis.speak(tts);
  };

  return (
    <main className="page-layout">
      <div className="card-container">
        <div
          className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="card-front">
            <p className="eng-text">{currentData.eng}</p>
            <button
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                speak(currentData.eng);
              }}
            >
              🔊 들어보기
            </button>
          </div>

          <div className="card-back">
            <p className="kor-text">{currentData.kor}</p>
          </div>
        </div>
      </div>

      <footer className="controls">
        <button
          className="nav-btn"
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(c => c - 1);
              setIsFlipped(false);
            }
          }}
          disabled={currentIndex === 0}
        >
          ⬅ 이전
        </button>

        <span className="page-info">
          {currentIndex + 1} / {studyData.length}
        </span>

        <button
          className="nav-btn primary"
          onClick={() => {
            if (currentIndex < studyData.length - 1) {
              setCurrentIndex(c => c + 1);
              setIsFlipped(false);
            }
          }}
          disabled={currentIndex === studyData.length - 1}
        >
          다음 ➡
        </button>
      </footer>
    </main>
  );
}

export default Voca;
