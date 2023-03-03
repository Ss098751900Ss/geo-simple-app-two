import {
  Map,
  GeolocateControl,
  NavigationControl,
  MapProvider,
} from "react-map-gl";
import { useRef, useState, useEffect, useContext } from "react";
import { LocationClient } from "@aws-sdk/client-location";
import "@aws-amplify/ui-react/styles.css";
import "maplibre-gl/dist/maplibre-gl.css";
//import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { Flex, Text, View } from "@aws-amplify/ui-react";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppContext, defaultState, Draw } from "./AppContext";
import maplibregl from "maplibre-gl";
import DrawControl from "./DrawControl.tsx";
import Control from "./Control/Control";
import { Auth } from "@aws-amplify/auth";
import { AmplifyMapLibreRequest } from "maplibre-gl-js-amplify";
import { Geo } from "@aws-amplify/geo";
import SourceLayer from "./Control/SourceLayer.tsx";
import useGeojson from "./hooks/useGeojson.tsx";
import useDetectMode from "./hooks/useDetectMode.tsx";
import UpdateRealLayer from "./UpdateRealLayer.tsx";
import { useMap } from "react-map-gl";
import { useCallback } from "react";
import List from "./List.tsx";
//mport SelectBoxControl from "./Control/SelectBoxControl";

//import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
//import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
//import { ThemeProvider, createTheme } from '@mui/material/styles';

Amplify.configure(awsconfig);

function GeoMap() {
  //const mapRef = useRef();
  //console.log("mapRef", mapRef);
  const { current: map } = useMap();
  const [locationClient, setLocationClient] = useState(null);
  const context = useContext(AppContext);

  const [transformRequest, setRequestTransformer] = useState({});
  const [credentials, setCredentials] = useState(null);

  // Side effect to get the temporary credentials from Amazon Cognito
  useEffect(() => {
    async function getCredentials() {
      const credentials = await Auth.currentCredentials();
      setCredentials(credentials);
    }
    getCredentials();
  }, []);

  // Side effect to create a requestTransformer for the Map
  useEffect(() => {
    const makeRequestTransformer = async () => {
      if (credentials !== null) {
        const amplifyRequest = new AmplifyMapLibreRequest(
          credentials,
          Geo.getDefaultMap().region
        );
        setRequestTransformer(() => amplifyRequest.transformRequest);
      }
    };

    makeRequestTransformer();
  }, [credentials]);

  useEffect(() => {
    const makeLocationClient = async () => {
      if (locationClient === null && credentials !== null) {
        const client = new LocationClient({
          credentials: credentials,
          region: Geo.getDefaultMap().region,
        });
        setLocationClient(client);
      }
    };
    makeLocationClient();
    //console.log(locationClient);
  }, [credentials, locationClient]);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-219.9186944, 35.6919284],
              [-219.8692377, 35.6327935],
              [-219.9461703, 35.5926014],
              [-220.0018573, 35.6467198],
              [-219.9194296, 35.6930192],
            ],
          ],
        },
      },
    ],
  };

  const onMapLoad = useCallback(() => {
    map.on("on", () => {
      // do something
      return (
        <div style={{ width: "20%" }}>
          <Control />
        </div>
      );
    });
  }, [map]);

  return (
    <>
      <MapProvider>
        <AppContext.Provider
          value={{
            map: defaultState.map,
            props: defaultState.props,
            state: defaultState.state,
            config: {
              locationClient: locationClient,
              transformRequest: defaultState.config.transformRequest,
            },
            hooks: {
              useGeojson: useGeojson(),
              useDetectMode: useDetectMode(),
            },
          }}
        >
          {transformRequest && locationClient ? (
            <>
              <div id="main" style={{ display: "flex", flexDirection: "row" }}>
                {/*
                  <div style={{ width: "20%" }}>
                    <Control />
                  </div>
                  */}
                <Map
                  id="myMap"
                  style={{ width: "100vw", height: "100vh", zIndex: "0" }}
                  initialViewState={{
                    longitude: 140.343062,
                    latitude: 35.726786,
                    zoom: 10,
                  }}
                  mapStyle="mapbox://styles/mapbox/navigation-night-v1"
                  mapLib={maplibregl}
                  transformRequest={transformRequest}
                  mapboxAccessToken="pk.eyJ1Ijoic3MwOTg3NTE5MDBzcyIsImEiOiJjbDVyNjllejEyNGF2M2Jyb25zZzM4M2Y0In0.A4sZaXQPpyTCy5cWGm750w"
                >
                  {/*
                   */}

                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      zIndex: "1",
                      backgroundColor: "#25283a",
                      opacity: "0.8",
                      height: "100vh",
                      width: "20%",
                      borderRadius: "10px",
                    }}
                  >
                    <Control />
                  </div>

                  <GeolocateControl />
                  <NavigationControl />
                  {context.state.onoff.updateRealLayer ? (
                    <UpdateRealLayer />
                  ) : (
                    <></>
                  )}
                  <DrawControl />
                  {(() => {
                    if (context.state.mode === "simple_select") {
                      return <SourceLayer />;
                    } else if (context.state.mode === "draw_polygon") {
                      return <div />;
                    }
                  })()}
                </Map>

                {/*
                <div style={{
                  zIndex: "1",
                  backgroundColor: "#25283a",
                  height: "100vh",
                  width: "15%",
                }}>
                  <List />
                </div>


*/}
              </div>
            </>
          ) : (
            <Flex
              justifyContent="center"
              alignItems="center"
              width="100vw"
              height="calc(100vh - var(--amplify-space-xxl))"
            >
              <Text size="large">Loading...</Text>
            </Flex>
          )}
        </AppContext.Provider>
      </MapProvider>
    </>
  );
}

export default GeoMap;
