import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Shell from './Shell';

function App() {
  return (
    <BrowserRouter>
      <Shell>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
