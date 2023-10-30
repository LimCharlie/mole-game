import { useState, useEffect } from 'react';
import mole from './assets/mole.png';
import hole from './assets/hole.png';
import './App.css';

function App() {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);


  function setMolesVisible(index: number, isVisible: boolean) {
    setMoles((currMoles) => {
      const newMoles = [...currMoles];
      newMoles[index] = isVisible;
      return newMoles;
    });
  }

  function wackMole(index: number) {
    if (!mole[index]) return;
    setMolesVisible(index, false)
    setScore(score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMolesVisible(randomIndex, true)
      setTimeout(() => {
        setMolesVisible(randomIndex, false);
      }, 700);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);


  return (
    <>
      <h1>Score {score}</h1>
      <div className='grid'>
        {moles.map((isMole, index) => (
          <img key={index} src={isMole ? mole : hole} onClick={() => {wackMole(index)}} />
        ))}
      </div>
    </>
  );
}

export default App;
