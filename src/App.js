import logo from './logo.svg';
import './App.css';
import {Keyboard} from "./_Keyboard"
import React, { useState } from 'react';

function App() {

  const [word, setWord] = useState(['', '', '', '', '']);

  const handleLetterChange = (index, value) => {
    if (/^[a-zA-Z]$/.test(value)) {
      const newWord = [...word];
      newWord[index] = value.toUpperCase();
      setWord(newWord);

      // Move focus to the next empty box
      const nextIndex = getNextEmptyBoxIndex(index + 1);
      if (nextIndex !== -1) {
        document.getElementById(`letter-input-${nextIndex}`).focus();
      }
    }
  };

  const handleRowClick = (index) => {
    // Move focus to the next empty box in the clicked row
    const nextIndex = getNextEmptyBoxIndex(index);
    if (nextIndex !== -1) {
      document.getElementById(`letter-input-${nextIndex}`).focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      // Handle backspace (delete letter)
      const newWord = [...word];
      newWord[index] = '';
      setWord(newWord);

      // Move focus to the previous box if available
      const prevIndex = getPrevBoxIndex(index - 1);
      if (prevIndex !== -1) {
        document.getElementById(`letter-input-${prevIndex}`).focus();
      }
    }
  };

  const getNextEmptyBoxIndex = (startIndex) => {
    for (let i = startIndex; i < word.length; i++) {
      if (word[i] === '') {
        return i;
      }
    }
    return -1; // No empty box found
  };

  const getPrevBoxIndex = (startIndex) => {
    for (let i = startIndex; i >= 0; i--) {
      if (word[i] !== '') {
        return i;
      }
    }
    return -1; // No non-empty box found
  };

  return (
    <div className="App">
      <h1>Wordle App</h1>
      <div className="word-container">
        {word.map((letter, index) => (
          <input
            key={index}
            id={`letter-input-${index}`}
            type="text"
            maxLength="1"
            value={letter}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onChange={(e) => handleLetterChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
