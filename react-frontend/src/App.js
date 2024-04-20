import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchRescue from './SearchRescue'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/search-rescue" element={<SearchRescue />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;