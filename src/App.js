import logo from './logo.svg';
import './App.css';
import {Keyboard} from "./_Keyboard"
import { Row } from './_Row';
import React, { useState } from 'react';

function App() {

  const [current, SetCurrent] = useState(1)

  const moveNext = () => {
    SetCurrent(current+1)
  }

  console.log(current)

  return (
    <>
    <Row nums={1} current={current} moveNext={moveNext}/>
    <Row nums={2} current={current} moveNext={moveNext}/>
    <Row nums={3} current={current} moveNext={moveNext}/>
    <Row nums={4} current={current} moveNext={moveNext}/>
    <Row nums={5} current={current} moveNext={moveNext}/>
    </>
  )

}

export default App;
