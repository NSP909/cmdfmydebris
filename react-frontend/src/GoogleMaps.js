import React, { useEffect, useRef, useState } from "react";
import apiKey from "./apiKey";

function GoogleMapsWithHeatMap() {
  const mapRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=` +
      apiKey +
      `&libraries=visualization`; // Replace YOUR_API_KEY with your Google Maps API key
    script.async = true;

    // Error handling for script loading
    script.onerror = (error) => {
      console.error("Error loading Google Maps API:", error);
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
      fetch("http://127.0.0.1:5000/get-co")
        .then((response) => response.json())
        .then((data) => {
          const heatmapData = Object.entries(data).map(
            ([weight, coordinates]) => {
              const [lat, lng] = coordinates
                .split(",")
                .map((coord) => parseFloat(coord));
              return {
                location: new window.google.maps.LatLng(lat, lng),
                weight: parseFloat(weight) * 100,
              };
            }
          );

          if (window.google) {
            const google = window.google;
            const map = new google.maps.Map(mapRef.current, {
              center: { lat: 39.21671937147964, lng: -76.50911414889384 },
              zoom: 14,
              mapTypeId: google.maps.MapTypeId.SATELLITE, // Set default map type to satellite
            });
        

            const heatmap = new google.maps.visualization.HeatmapLayer({
              data: heatmapData,
              map: map,
              gradient: ["rgba(255,255,20 , 0)", "rgba(255, 0, 20, 1)"], // Change the gradient to red
              radius: 50, // Increase the radius of each heatmap point
              opacity: 1, // Increase the opacity to make the heatmap more prominent
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching heatmap data:", error);
        });
    }
  }, [scriptLoaded]);
 
  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
}

export default GoogleMapsWithHeatMap;
