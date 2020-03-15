import React from 'react';
import logo from './logo.svg';
import './App.css';

import Actors from './features/actors/Actors';
import Header from './shared/containers/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Actors />
    </div>
  );
}

export default App;
