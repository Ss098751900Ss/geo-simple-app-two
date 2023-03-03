import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import Map from "react-map-gl";
//import "mapbox-gl/dist/mapbox-gl.css";
Amplify.configure(awsconfig);

function App() {
  return (
    <>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        style={{ width: "100vw", height: "100vh", zIndex: "0" }}
        mapboxAccessToken="pk.eyJ1Ijoic3MwOTg3NTE5MDBzcyIsImEiOiJjbDVyNjllejEyNGF2M2Jyb25zZzM4M2Y0In0.A4sZaXQPpyTCy5cWGm750w"
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: "1",
            backgroundColor: "#25283a",
            opacity: "0.8",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h1>This is map</h1>
        </div>
      </Map>
    </>
  );
}

export default withAuthenticator(App);
