import './App.css';
import React, { useState, useEffect, useRef } from 'react';

export const Row = ({nums, current, moveNext}) => {

    const [word, setWord] = useState(['', '', '', '', '']);
    const firstInputElement = useRef(null);

    useEffect(() => {
        const nextIndex = getNextEmptyBoxIndex(0);
        if (nextIndex !== -1) {
          document.getElementById(`letter-input-${nums}${nextIndex}`).focus();
        }
      }, [current]);

    const handleLetterChange = (index, value) => {
      if (/^[a-zA-Z]$/.test(value)) {
        const newWord = [...word];
        newWord[index] = value.toUpperCase();
        setWord(newWord);
        const nextIndex = getNextEmptyBoxIndex(index + 1);
        if (nextIndex !== -1) {
          document.getElementById(`letter-input-${nums}${nextIndex}`).focus();
        }
      }
    };
  
    const handleKeyDown = (index, event) => {
      if (event.key === 'Backspace') {
        const newWord = [...word];
        newWord[index] = '';
        setWord(newWord);
        const prevIndex = getPrevBoxIndex(index - 1);
        if (prevIndex !== -1) {
          document.getElementById(`letter-input-${nums}${prevIndex}`).focus();
        }
      }
      if(event.key === 'Enter') {
        let x = getNextEmptyBoxIndex(0)
        moveNext()
      }
    };
  
    const getNextEmptyBoxIndex = (startIndex) => {
      for (let i = startIndex; i < word.length; i++) {
        if (word[i] === '') {
          return i;
        }
      }
      return -1;
    };
  
    const getPrevBoxIndex = (startIndex) => {
      for (let i = startIndex; i >= 0; i--) {
        if (word[i] !== '') {
          return i;
        }
      }
      return -1;
    };

    const onRowClicked = () => {
        if(nums===current){
            console.log(1)
            const nextIndex = getNextEmptyBoxIndex(0);
            if (nextIndex !== -1) {
            document.getElementById(`letter-input-${nums}${nextIndex}`).focus();
            }
        }
    }
  
    return (
      <div>
        <div className="word-container" onClick={onRowClicked}>
          {word.map((letter, index) => (
            <input
              key={index}
              disabled={nums===current ? false : true}
              id={`letter-input-${nums}${index}`}
              type="text"
              maxLength="1"
              value={letter}
              style={{ pointerEvents: 'none'}}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={index === 0 ? firstInputElement : null}
              onChange={(e) => handleLetterChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
    );
}