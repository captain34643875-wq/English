import React, { useState } from 'react';
import { speakingData } from '../data/Data';
import '../App.css';

const Speaking = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userText, setUserText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");

  const currentData = speakingData[currentIndex];

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("브라우저 미지원");

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setUserText("");
      setResult("말해보세요...");
    };

    recognition.onresult = (e) => {
      const speech = e.results[0][0].transcript;
      setUserText(speech);
      checkAnswer(speech);
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const checkAnswer = (input) => {
    const cleanIn = input.toLowerCase().replace(/[.,!?]/g, "");
    const cleanAns = currentData.eng.toLowerCase().replace(/[.,!?]/g, "");
    setResult(cleanIn === cleanAns ? "✅ 정답!" : "❌ 다시 시도!");
  };

  return (
    <main className="page-layout">
      <div className="speaking-card">
        <p className="kor-text">{currentData.kor}</p>
        <h2>{currentData.eng}</h2>

        <p>{userText}</p>
        <p>{result}</p>

        <button
          className="nav-btn primary"
          onClick={startListening}
          disabled={isListening}
        >
          🎤 말하기
        </button>
      </div>

      <div className="controls">
        <button
          className="nav-btn"
          onClick={() => currentIndex > 0 && setCurrentIndex(c => c - 1)}
        >
          ⬅ 이전
        </button>

        <button
          className="nav-btn primary"
          onClick={() =>
            currentIndex < speakingData.length - 1 &&
            setCurrentIndex(c => c + 1)
          }
        >
          다음 ➡
        </button>
      </div>
    </main>
  );
};

export default Speaking;
