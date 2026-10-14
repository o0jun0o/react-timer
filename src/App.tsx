import { useState,useEffect } from 'react';
import './App.css';

function App() {
  // タイマーの秒数を管理する「箱（State）」を用意
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let intervalId: number | undefined;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <div>
      <h1>デジタルタイマー</h1>
      <div style={{ fontSize: '4rem', margin: '20px 0' }}>
        {time} 秒
      </div>
      
      <div>
        <button onClick={() => setIsRunning(true)}>スタート</button>
        <button onClick={() => setIsRunning(false)}>ストップ</button>
        <button onClick={() => { setIsRunning(false); setTime(0); }}>リセット</button>
      </div>
    </div>
  );
}

export default App;