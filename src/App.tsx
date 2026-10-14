import { useState } from 'react';
import './App.css';

function App() {
  // タイマーの秒数を管理する「箱（State）」を用意
  const [time, setTime] = useState(0);

  return (
    <div>
      <h1>デジタルタイマー</h1>
      <div style={{ fontSize: '4rem', margin: '20px 0' }}>
        {time} 秒
      </div>
      
      <div>
        <button>スタート</button>
        <button>ストップ</button>
        <button>リセット</button>
      </div>
    </div>
  );
}

export default App;