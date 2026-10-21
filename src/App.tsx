import { useState, useEffect } from 'react';
import './App.css';


const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');

  return `${h}:${m}:${s}`;
};
function App() {
  // これまでにストップして貯まった合計時間（ミリ秒）
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  // 最後にスタートボタンを押した時刻（ミリ秒）
  const [startTime, setStartTime] = useState<number | null>(null);
  // タイマーが動いているかどうか
  const [isRunning, setIsRunning] = useState(false);
  // 画面に表示するための時間（ミリ秒）
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    let intervalId: number;

    if (isRunning && startTime !== null) {
      // setIntervalは「時間を計算して画面を書き換えるきっかけ」としてだけ使う
      intervalId = window.setInterval(() => {
        const now = Date.now();
        // 過去の蓄積時間 ＋（今の時刻 － スタートした時刻）
        setDisplayTime(accumulatedTime + (now - startTime));
      }, 50); // 1秒(1000ms)ではなく短い間隔にして精度を上げる
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime, accumulatedTime]);

  const handleStart = () => {
    if (isRunning) return;
    setStartTime(Date.now()); // スタート時の現在時刻を記録
    setIsRunning(true);
  };

  const handleStop = () => {
    if (startTime !== null) {
      const now = Date.now();
      // ストップした時点での経過時間を「蓄積時間」に足し込む
      const total = accumulatedTime + (now - startTime);
      setAccumulatedTime(total);
      setDisplayTime(total); // ← 画面の表示もここで最新に更新する！
    }
    setIsRunning(false);
    setStartTime(null);
  };

  const handleReset = () => {
    setIsRunning(false);
    setAccumulatedTime(0);
    setStartTime(null);
    setDisplayTime(0);
  };

  // 表示用にミリ秒を秒に変換（切り捨て）
  const seconds = Math.floor(displayTime / 1000);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>デジタルタイマー</h1>
      <div style={{ fontSize: '4rem', margin: '20px 0' }}>
        {formatTime(seconds)}
      </div>
      <div>
        <button onClick={handleStart} disabled={isRunning}>
          スタート
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          ストップ
        </button>
        <button onClick={handleReset} disabled={!isRunning && accumulatedTime === 0}>
          リセット
        </button>
      </div>
    </div>
  );
}

export default App;