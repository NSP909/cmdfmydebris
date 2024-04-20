import React from 'react';
import ImageUpload2 from './ImageUpload2';
import './DebrisDetector.css';
import GoogleMapWithHeatMap from './GoogleMaps';

function App() {
  return (
    <div className="App">
      <div className = 'bg-white dark:bg-gray-900 mt-[10vh] h-[100vh]'>
        <ImageUpload2 />
        <GoogleMapWithHeatMap /> {/* Add the GoogleMap component */}
      </div>
    </div>
  );
}

export default App;

