import React from "react";
import GoogleMapReact from "google-map-react";
import "../css/map.css";

const Map = ({ zoomLevel, customerAddress }) => {
  const location = {
    address: "Moss Lane, Orrell Park, Liverpool",
    lat: 53.46291585090182,
    lng: -2.9696283837314783,
  };

  const customerLocation = {
    address: "Cust address",
    lat: 53.46151137298861,
    lng: -2.9676916285308814,
  };

  const centreLocation = {
    address: "mid",
    lat: (location.lat + customerLocation.lat) / 2,
    lng: (location.lng + customerLocation.lng) / 2,
  };

  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KE,
        }}
        defaultCenter={centreLocation}
        defaultZoom={zoomLevel}
      >
        <div className="pin-container" lat={location.lat} lng={location.lng}>
          <div className="pin-icon-shop">
            <i class="fas fa-map-marker-alt"></i>
          </div>
        </div>
        <div
          className="pin-container"
          lat={customerLocation.lat}
          lng={customerLocation.lng}
        >
          <div className="pin-icon-customer">
            <i class="fas fa-map-marker-alt"></i>
          </div>
        </div>
      </GoogleMapReact>
    </div>
  );
};

export default Map;
