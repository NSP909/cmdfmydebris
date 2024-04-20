import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchRescue from './SearchRescue'
import HomePage from './HomePage';
import DebrisDetector from './DebrisDetector';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/search-rescue" element={<SearchRescue />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/debris-detector" element={<DebrisDetector/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;