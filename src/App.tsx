import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import GameSelection from './Game/GameSelection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Main}></Route>
        <Route path="/gameSelection" Component={GameSelection}></Route>    
      </Routes>
    </BrowserRouter>
  );
}

export default App;

