import React, { useEffect, useRef, useState } from 'react';

function GoogleMapsWithHeatMap() {
  const mapRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVRkHA0D7Osbo2Hpx0T0WGhdaKOu01dg8&libraries=visualization`;
    script.async = true;

    // Error handling for script loading
    script.onerror = (error) => {
      console.error('Error loading Google Maps API:', error);
    };

    script.onload = () => {
      setScriptLoaded(true);
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      setTimeout(() => {
        if (window.google) {
          const google = window.google;
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 10,
          });

          const heatmapData = [
            new google.maps.LatLng(40.7128, -74.0060), // Example data point
            // Add more data points as needed
          ];

          const heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            map: map,
          });

          heatmap.set('radius', 20); // Adjust the radius of each heatmap point
        }
      }, 1000); // Adjust the delay as needed
    }
  }, [scriptLoaded]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}

export default GoogleMapsWithHeatMap;
