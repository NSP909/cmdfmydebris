// HomePage.js

import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to our Website</h1>
      </header>
      <section className="purpose-section">
        <h2>Our Purpose</h2>
        <p>The purpose of this website is to show our invention of how we can help those in natural disaster situations. With the use of drone
            footage we can see who is affected and find ways to help them. At the same time, we are also able to indentify the type of debris and 
            how much of the debris is present at the site of the disaster inorder to come with solutions to fix this issue.</p>
      </section>
      <section className="buttons-section">
        <Link to="/search-rescue">
          <button className="search-rescue-btn">Search and Rescue</button>
        </Link>
        <Link to="/debris-detector">
          <button className="debris-detector-btn">Debris Detector</button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
