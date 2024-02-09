import './App.css';
import React, { useState, useEffect, useRef } from 'react';

export const Row = ({nums, current, moveNext, setUsed, quest}) => {

    const [word, setWord] = useState(['', '', '', '', '']);
    const [done, SetDone] = useState(false);
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
        let length = getNextEmptyBoxIndex(0)
        if(length==4){
          SetDone(true)
          setUsed(word)
          moveNext()
        }      
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
          newWord[prevIndex] = '';
        }       
      }
      if(event.key === 'Enter') {
        let length = getNextEmptyBoxIndex(0)
        if(length==-1){
          SetDone(true)
          setUsed(word)
          moveNext()
        }        
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
            const nextIndex = getNextEmptyBoxIndex(0);
            if (nextIndex !== -1) {
            document.getElementById(`letter-input-${nums}${nextIndex}`).focus();
            }
        }
    }
  
    const guess = (index) => {      
      if (quest[index]===word[index]){
        return 'lightgreen'
      } 
      if (quest.includes(word[index])) return 'yellow'
      return 'grey'
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
              style={done ? { background: guess(index)}
                          : {}}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={index === 0 ? firstInputElement : null}
              onChange={(e) => handleLetterChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
    );
}