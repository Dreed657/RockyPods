import React from 'react';

import Header from './components/Header';
import GameBody from './components/GameBody';

import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Header></Header>
      <GameBody></GameBody>
    </div>
  );
}

export default App;
