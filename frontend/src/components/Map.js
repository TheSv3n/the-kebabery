import React from "react";
import GoogleMapReact from "google-map-react";
import "../css/map.css";

const Map = ({ zoomLevel }) => {
  const location = {
    address: "Moss Lane, Orrell Park, Liverpool",
    lat: 53.46291585090182,
    lng: -2.9696283837314783,
  };

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
