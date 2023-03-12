import React, { FC } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import Map from "react-map-gl";
//import "@aws-amplify/ui-react/styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "@aws-amplify/ui-react/styles.css";

import maplibregl from "maplibre-gl";

import { AppContext, defaultState } from "./AppContext";
import { useControl } from "react-map-gl";
import { useCallback, useState, useContext } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import type { MapRef, ControlPosition } from "react-map-gl";

Amplify.configure(awsconfig);

//type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
//  position?: ControlPosition;
//
//  onCreate?: (evt: { features: object[] }) => void;
//  onUpdate?: (evt: { features: object[]; action: string }) => void;
//  onDelete?: (evt: { features: object[] }) => void;
//};

//const DrawControl: FC = (props: DrawControlProps) => {
//  const context = useContext(AppContext);
//
//  useControl<MapboxDraw>(
//    () => new MapboxDraw(props),
//    ({ map }: { map: MapRef }) => {
//      map.on("draw.create", props.onUpdate);
//      map.on("draw.update", props.onUpdate);
//      map.on("draw.delete", props.onDelete);
//    },
//    ({ map }: { map: MapRef }) => {
//      map.off("draw.create", props.onUpdate);
//      map.off("draw.update", props.onUpdate);
//      map.off("draw.delete", props.onDelete);
//    },
//    {
//      position: context.props.position,
//    }
//  );
//
//  return null;
//};

const App: FC = () => {
  //interface Feature {
  //  geometry: object;
  //  id: string;
  //}

  //type StringKeys = Record<string, Feature>;
  //interface Event {
  //  features: Array<Feature>;
  //  target: object;
  //  type: string;
  //}

  //const [features, setFeatures] = useState<StringKeys>({});
  //const onUpdate = useCallback((e: Event) => {
  //  setFeatures((currFeatures) => {
  //    const newFeatures = { ...currFeatures };

  //    for (const f of e.features) {
  //      newFeatures[f.id] = f;
  //    }
  //    return newFeatures;
  //  });
  //}, []);

  //const onDelete = useCallback((e: Event) => {
  //  setFeatures((currFeatures) => {
  //    const newFeatures = { ...currFeatures };
  //    for (const f of e.features) {
  //      delete newFeatures[f.id];
  //    }
  //    return newFeatures;
  //  });
  //}, []);

  //const hoge = typeof MapboxDraw;
  //console.log(hoge);

  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "90%",
        height: "90%",
      }}
      mapLib={maplibregl}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken="pk.eyJ1Ijoic3MwOTg3NTE5MDBzcyIsImEiOiJjbDVyNjllejEyNGF2M2Jyb25zZzM4M2Y0In0.A4sZaXQPpyTCy5cWGm750w"
    ></Map>
  );
};

export default App;
