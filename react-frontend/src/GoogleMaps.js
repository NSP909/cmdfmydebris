import React, { useEffect, useRef, useState } from "react";
import apiKey from "./apiKey";

function GoogleMapsWithHeatMap() {
  const mapRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        apiKey +
        `&libraries=visualization&async=true`; // Add async attribute
      script.onload = () => {
        setScriptLoaded(true);
      };
      script.onerror = (error) => {
        console.error("Error loading Google Maps API:", error);
      };
      document.body.appendChild(script);

      // Cleanup function to remove the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    } else {
      setScriptLoaded(true);
    }
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

          const google = window.google;
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 39.21671937147964, lng: -76.50911414889384 },
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
          });

          const heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            map: map,
            gradient: ["rgba(255,20,20 , 0)", "rgba(255, 0, 20, 1)"],
            radius: 50,
            opacity: 1,
          });
        })
        .catch((error) => {
          console.error("Error fetching heatmap data:", error);
        });
    }
  }, [scriptLoaded]);

  return <div ref={mapRef} style={{ width: "40%", height: "453px" }} />;
}

export default GoogleMapsWithHeatMap;
