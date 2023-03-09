import React, { FunctionComponent } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import Map from "react-map-gl";
import "@aws-amplify/ui-react/styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppContext, defaultState } from "./AppContext";
import { useControl } from "react-map-gl";
import { useCallback, useState, useContext } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import type { MapRef, ControlPosition } from "react-map-gl";

Amplify.configure(awsconfig);

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
};

function DrawControl(props: DrawControlProps): FunctionComponent {
  const [features, setFeatures] = useState({});
  const context = useContext(AppContext);

  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }: { map: MapRef }) => {
      map.on("draw.create", props.onUpdate);
      map.on("draw.update", props.onUpdate);
      map.on("draw.delete", props.onDelete);
    },
    ({ map }: { map: MapRef }) => {
      map.off("draw.create", props.onUpdate);
      map.off("draw.update", props.onUpdate);
      map.off("draw.delete", props.onDelete);
    },
    {
      position: context.props.position,
    }
  );

  return null;
}

function App() {
  const onUpdate = useCallback((e: any) => {
    setFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: any) => {
    setFeatures((currFeatures) => {
      const newFeatures: any = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  const hoge = typeof MapboxDraw;
  console.log(hoge);

  return (
    <>
      <AppContext.Provide
        value={{
          map: defaultState.map,
          props: defaultState.props,
          state: defaultState.state,
          config: {
            locationClient: {},
            transformRequest: defaultState.config.transformRequest,
          },
          hooks: {
            useGeojson: {},
            useDetectMode: {},
          },
        }}
      >
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
            position="top-right"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </Map>
      </AppContext.Provide>
    </>
  );
}

export default withAuthenticator(App);
