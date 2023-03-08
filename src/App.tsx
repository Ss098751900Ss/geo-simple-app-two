import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import Map from "react-map-gl";
import "@aws-amplify/ui-react/styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useControl } from "react-map-gl";
import { useCallback, useState } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import { MapRef } from "react-map-gl";

Amplify.configure(awsconfig);

const DrawControl = () => {
  const [features, setFeatures] = useState({});
  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }: { map: MapRef }) => {
      map.on("draw.create", onUpdate);
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
    },
    ({ map }: { map: MapRef }) => {
      map.off("draw.create", onUpdate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position: props.position,
    }
  );

  return null;
};

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
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: "0",
          position: "absolute",
          top: "0px",
          left: "0px",
        }}
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
        <DrawControl
          osition="top-right"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
        />
      </Map>
    </>
  );
}

export default withAuthenticator(App);
