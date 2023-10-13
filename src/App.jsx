import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [countLog, setCountLog] = useState([]);

  const handleIncrement = () => {
    const logDescription = `Increment at ${new Date(Date.now()).toLocaleTimeString()}`;
    setCount(count + 1);
    setCountLog([...countLog, logDescription]);
  }

  const handleDecrement = () => {
    const logDescription = `Decrement at ${new Date(Date.now()).toLocaleTimeString()}`;
    setCount(count - 1);
    setCountLog([...countLog, logDescription]);
  }

  const handleReset = () => {
    setCount(0);
    setCountLog([]);
  }

  const calculateCounter = (logs) => {
    let temp = 0;
    logs.forEach((log) => {
      if (log.includes('Increment')) {
        temp++;
      } else {
        temp--;
      }
    })
    return temp;
  }
  const handleTimeTravel = (index) => {
    const updatedLogs = countLog.slice(0, index + 1);
    setCountLog(updatedLogs);
    // update counter to reflect the count at this time
    setCount(calculateCounter(updatedLogs));
  }

  return (
    <div className='app-container'>
      <div className='count-container'>
        <h1>Counter App</h1>
        <h2>{count}</h2>

        <div className='button-container'>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
        </div>

        <reset-container>
          <button onClick={handleReset}>Reset</button>
        </reset-container>
        

      </div>

      <div className='log-container'>
        <h2>Count Log</h2>
        <div className='log-items'>
          {countLog.length 
            ? countLog.map((log, index) => (
              <li 
                key={index}
                className='log-item'
                onClick={() => handleTimeTravel(index)}
              >
                {log}
              </li>
            ))
            : 'No Logs to Display'}
        </div>

      </div>
      
    </div>
  );
}

export default App;
