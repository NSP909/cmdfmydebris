// HomePage.js

import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to our Website</h1>
      </header>
      <section className="purpose-section">
        <h2>Our Purpose</h2>
        <p>This is the purpose section. Describe the purpose of your website here.</p>
      </section>
      <section className="buttons-section">
        <button className="search-rescue-btn">Search and Rescue</button>
        <button className="debris-detector-btn">Debris Detector</button>
      </section>
    </div>
  );
}

export default HomePage;
