import React from "react";
import GoogleMapReact from "google-map-react";
import "../css/map.css";

const Map = ({ zoomLevel, apiKey }) => {
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: { apiKey } }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
