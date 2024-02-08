import React, { useEffect } from 'react';

export const Keyboard = ({ onClick, usedLetters}) => {
  const keyboardRow1 = 'QWERTYUIOP';
  const keyboardRow2 = 'ASDFGHJKL'
  const keyboardRow3 = 'ZXCVBNM'

  const rowStyles = {display:"flex", justifyContent:"center", alignItems:"center"}

  const simulateKeyPress = (key) => {
    const event = new KeyboardEvent('keydown', {
      key: key,
      bubbles: true,
      cancelable: true
    });
  }

  return (
    <>
    <div style={rowStyles}>
        {keyboardRow1.split("").map((letter)=><KeyboardKey letter={letter} onClick={simulateKeyPress} col={usedLetters[letter]}/>)}
    </div>
    <div style={rowStyles}>
        {keyboardRow2.split("").map((letter)=><KeyboardKey letter={letter} onClick={simulateKeyPress} col={usedLetters[letter]}/>)}
    </div>
    <div style={rowStyles}>
        {keyboardRow3.split("").map((letter)=><KeyboardKey letter={letter} onClick={simulateKeyPress} col={usedLetters[letter]}/>)}
    </div>
    {/*<div style={rowStyles}>
        {['clear','enter'].map((letter)=><KeyboardKey letter={letter}/>)}
  </div>*/}
    </>
  );
};


export const KeyboardKey = ({onClick, state, letter, col}) => {
    let ss = {padding:"10px", width:"40px", fontSize:"1.2rem", fontWeight:"bold", color:"black"}
    ss['background']=col
    useEffect(()=>{},[col])
    return (
        <div style={{margin:"5px"}}>
          <button
              key={letter}
              onClick={() => onClick(letter)}
              style={ss}
            >
              {letter}
            </button>
        </div>
    )
}