import React from 'react';

const state = {
    1:"used",
    2:"not-used",
    3:"misplaced",
    4:"placed"
}

export const Keyboard = ({ onClick, usedLetters=[] }) => {
  const keyboardRow1 = 'QWERTYUIOP';
  const keyboardRow2 = 'ASDFGHJKL'
  const keyboardRow3 = 'ZXCVBNM'

  const rowStyles = {display:"flex", justifyContent:"center", alignItems:"center"}

  return (
    <>
    <div style={rowStyles}>
        {keyboardRow1.split("").map((letter)=><KeyboardKey letter={letter}/>)}
    </div>
    <div style={rowStyles}>
        {keyboardRow2.split("").map((letter)=><KeyboardKey letter={letter}/>)}
    </div>
    <div style={rowStyles}>
        {keyboardRow3.split("").map((letter)=><KeyboardKey letter={letter}/>)}
    </div>
    <div style={rowStyles}>
        {['clear','enter'].map((letter)=><KeyboardKey letter={letter}/>)}
    </div>
    </>
  );
};


export const KeyboardKey = ({onClick, state, letter}) => {
    
    return (
        <div style={{margin:"5px"}}>
          <button
              key={letter}
              onClick={() => onClick(letter)}
              style={{padding:"10px", fontSize:"1.2rem", fontWeight:"bold"}}
            >
              {letter}
            </button>
        </div>
    )
}
