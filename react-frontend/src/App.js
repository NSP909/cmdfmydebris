import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchRescue from './SearchRescue'
import HomePage from './HomePage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/search-rescue" element={<SearchRescue />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;