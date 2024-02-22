import './App.css';
import {Keyboard} from "./_Keyboard"
import { Row } from './_Row';
import { Dailog } from './_Dailog';
import React, { useEffect, useState } from 'react';
import { getWord } from './words';
import { Help } from './_Dailog';
import * as microsoftTeams from "@microsoft/teams-js";

function App() {

  const [current, SetCurrent] = useState(1)
  const [randomIndex, setR] = useState(Math.random())
  const [quest, setQuest] = useState(['H','E','L','P','S'])
  const [end, setEnd] = useState(false)
  const [help, isHelp] = useState(false)
  const tries = 6
  
  useEffect(()=>{  microsoftTeams.initialize(); setQuest(getWord(randomIndex))},[])

  const [used, setUsed] = useState(
    () => {
      let initialState = {};
      for (let i = 65; i <= 90; i++) {
        let key = String.fromCharCode(i);
        initialState[key] = 'white';
      }
      return initialState;
    } 
  )

  const moveNext = () => SetCurrent(current+1)

  const updateUsed = (chae) => {   
    let x= {}
    for (let i = 0; i < chae.length; i++) {
     x[chae[i]] = guess(i,chae)
    }
    setUsed((prevState) => ({
      ...prevState,
      ...x,
    }))
    
    let w=true
    for (let i = 0; i < chae.length; i++) {
      if (chae[i] !== quest[i]) {
       w = false
      }
    }
    if (w) setEnd(true)
  }

  const guess = (index, word) => {
    if (quest[index]===word[index]){
      return 'lightgreen'
    } 
    if (quest.includes(word[index])) return 'yellow'
    return 'grey'
  }

  return (
    <div className="App">
    <h1 style={{color:"#fff", fontSize:"2.6rem", textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'}}>WORDLE</h1>    
    {help && <Help close={()=>isHelp(!help)}/>}
    {end && <Dailog message='You Win !' m={1} word={quest}/>}
    {current>tries && !end && <Dailog message='You Loose !' m={2} word={quest}/>}
    {!help && !end && <>
      <Row nums={1} current={current} moveNext={moveNext} setUsed={updateUsed} quest={quest}/>
      <Row nums={2} current={current} moveNext={moveNext} setUsed={updateUsed} quest={quest}/>
      <Row nums={3} current={current} moveNext={moveNext} setUsed={updateUsed} quest={quest}/>
      <Row nums={4} current={current} moveNext={moveNext} setUsed={updateUsed} quest={quest}/>
      <Row nums={5} current={current} moveNext={moveNext} setUsed={updateUsed} quest={quest}/>
      <Row nums={6} current={current} moveNext={moveNext} setUsed={updateUsed} quest={quest}/>
      <Keyboard usedLetters={used}/>
      <h3 style={{color: '#FFF', cursor:"pointer"}} onClick={()=>isHelp(!help)}><u>How to Play</u></h3>
    </>}
    </div>
  )

}

export default App;
