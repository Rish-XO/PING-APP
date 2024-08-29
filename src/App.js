import React, { useState } from 'react';

function App() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState('');

  const handlePing = async () => {
    const response = await window.api.ping(ip);
    setResult(response);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ping Application</h1>
      <input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="Enter IP address"
      />
      <button onClick={handlePing}>Ping</button>
      {result && <p>Ping Result: {result}</p>}
    </div>
  );
}

export default App;
