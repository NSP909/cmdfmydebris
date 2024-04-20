import React from 'react';
import ImageUpload from './ImageUpload';
import './DebrisDetector.css';
import GoogleMapWithHeatMap from './GoogleMaps';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Debris detector upload</h1>
      </header>
      <main>
        <ImageUpload />
        <GoogleMapWithHeatMap /> {/* Add the GoogleMap component */}
      </main>
    </div>
  );
}

export default App;

