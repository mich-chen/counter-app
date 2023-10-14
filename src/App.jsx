import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [countLog, setCountLog] = useState([]);
  const [count, setCount] = useState(0); // need count state to remember running count aside from time travel
  const [pointer, setPointer] = useState(0);

  const calculateCounter = (logs) => {
    let temp = 0;
    logs.forEach((log) => {
      if (log.description.includes('Increment')) {
        temp++;
      } else {
        temp--;
      }
    })
    return temp;
  }

  const handleIncrement = () => {
    const logDescription = `Increment at ${new Date(Date.now()).toLocaleTimeString()}`;
    const currCount = calculateCounter(countLog) + 1;
    setCountLog([...countLog, {
      description: logDescription,
      count: currCount,
    }]);
    setCount(currCount);
    setPointer(countLog.length);
  }

  const handleDecrement = () => {
    const logDescription = `Decrement at ${new Date(Date.now()).toLocaleTimeString()}`;
    const currCount = calculateCounter(countLog) - 1;
    setCountLog([...countLog, {
      description: logDescription,
      count: currCount,
    }]);
    setCount(currCount);
    setPointer(countLog.length);
  }

  const handleReset = () => {
    setCount(0);
    setCountLog([]);
    setPointer(0);
  }

  const handleTimeTravel = ({ log, index }) => {
    setPointer(index);
    setCount(log.count);
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
                onClick={() => handleTimeTravel({ log, index })}
              >
                {log.description}{" "}{index === pointer ? '<--' : null}
              </li>
            ))
            : 'No Logs to Display'}
        </div>

      </div>
      
    </div>
  );
}

export default App;
