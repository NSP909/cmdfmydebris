import React from 'react';
import ImageUpload2 from './ImageUpload2';
import './House.css';
import GoogleMapWithHeatMap from './GoogleMaps';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>House Structural Damage Assessment</h1>
      </header>
      <main>
        <ImageUpload2 />
        <GoogleMapWithHeatMap /> {/* Add the GoogleMap component */}
      </main>
    </div>
  );
}

export default App;
