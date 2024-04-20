import React, { useEffect, useRef, useState } from 'react';

function GoogleMapsWithHeatMap() {
  const mapRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=visualization`; // Replace YOUR_API_KEY with your Google Maps API key
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
      fetch('http://127.0.0.1:5000/get-co')
        .then(response => response.json())
        .then(data => {
          const heatmapData = Object.entries(data).map(([weight, coordinates]) => {
            const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord));
            return { location: new window.google.maps.LatLng(lat, lng), weight: parseFloat(weight)*100 };
          });

          if (window.google) {
            const google = window.google;
            const map = new google.maps.Map(mapRef.current, {
              center: { lat: 40.7128, lng: -74.0060 },
              zoom: 10,
            });

            const heatmap = new google.maps.visualization.HeatmapLayer({
              data: heatmapData,
              map: map,
            });

            heatmap.set('radius', 20); // Adjust the radius of each heatmap point
          }
        })
        .catch(error => {
          console.error('Error fetching heatmap data:', error);
        });
    }
  }, [scriptLoaded]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}

export default GoogleMapsWithHeatMap;
