import React from 'react';
import ImageUpload from './ImageUpload';
import GoogleMap from './GoogleMap';
import './SearchRescue.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Debris detector upload</h1>
      </header>
      <main>
        <ImageUpload />
        <GoogleMap /> {/* Add the GoogleMap component */}
      </main>
    </div>
  );
}

export default App;

