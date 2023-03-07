import { createContext } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useMap } from "react-map-gl";

const defaultState = {
  map: {},
  props: {
    position: "top-right",
    displayControlsDefault: false,
    controls: {
      polygon: true,
      point: true,
      trash: true,
    },
    defaultMode: "simple_select",
  },
  state: {
    collectionName: "",
    geofence: {},
    geojson: {
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
    },
    mode: "draw_polygon",
    onoff: {
      updateRealLayer: false,
    },
    forGetDevicePosition: {},
    forGetDevicePositionHistory: {},
  },
  config: {
    locationClient: {},
    transformRequest: {},
  },
  hooks: {
    useGeojson: {},
    useDetectMode: {},
  },
};

const initial = defaultState.props;

function makeDrawComp() {
  const draw = new MapboxDraw(initial);
  return draw;
}

const Draw = makeDrawComp();
defaultState.draw = makeDrawComp(initial);

const AppContext = createContext(defaultState);

const Map = function () {
  const hoge = useMap();
  return hoge;
};

export { AppContext, defaultState, Draw, Map };
