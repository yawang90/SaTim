import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api')
        .then(res => res.json())
        .then(data => setMessage(data.message))
  }, []);
  return (
      <div>
        <h1>Full Stack App</h1>
        <p>{message}</p>
      </div>
  );
}

export default App;
