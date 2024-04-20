import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SearchRescue from './SearchRescue'
import ImageUpload from './ImageUpload';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/home' element = {<Home/>} />
          <Route path="/search-rescue" element={<SearchRescue />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;