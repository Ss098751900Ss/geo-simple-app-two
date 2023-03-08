//import { MapRef, useControl } from "react-map-gl";
//import MapboxDraw from "@mapbox/mapbox-gl-draw";
//import { useRef, useCallback, useContext } from "react";
//import { AppContext, defaultState, Draw, Map } from "./AppContext";
//
////mapコンポーネント上にMapboxDrawのコントロールボタンを設置するために存在している
//function DrawControl() {
//  //featureRefの初期値は正直からのオブジェクトを代入したいところだけど、
//  //このあとの流れの都合上どうしてもから配列を代入せざる得ない。
//  //なので、ブラウザのコンソールだとからの配列が出るけど気にする必要はない。
//  const featuresRef = useRef([]);
//  const context = useContext(AppContext);
//  const drawRef = useRef({});
//  context.state.geofence = featuresRef.current;
//  const mapC = Map();
//  const b: "foo" = "foo";
//
//  //MapboxDrawのオブジェクトがmapに作られたときと更新されたときに発動する
//  const onUpdate = useCallback((e) => {
//    for (const f of e.features) {
//      featuresRef.current.push(f);
//
//      //context.state.geofence = featuresRef.current.find(() => true)
//      console.log("UpdateVersion featuresRef.current", featuresRef.current);
//    }
//  }, []);
//
//  //選択されたポリゴンが削除されたときに発動する
//  const onDelete = useCallback((e) => {
//    for (const f of e.features) {
//      var index = featuresRef.current.indexOf(f.id);
//      featuresRef.current.splice(index);
//      console.log("DeleteVersion featuresRef.current", featuresRef.current);
//    }
//
//    console.log(featuresRef.current);
//  }, []);
//
//  //なんかに使う
//  const onModeChange = useCallback(
//    (e) => {
//      //console.log("draw.modechnage fired!", e);
//      if (e.mode === "simple_select") {
//        console.log("Current Mode is simple_select!");
//        context.state.mode = "simple_select";
//        Draw.deleteAll();
//      } else if (e.mode === "draw_polygon") {
//        console.log("Current mode is draw_polygon!");
//        const visivility = mapC.current.getLayoutProperty(
//          "polygon",
//          "visibility"
//        );
//        mapC.setLayoutProperty("polygon", "visibility", "none");
//        console.log(visivility);
//        context.state.mode = "draw_polygon";
//      } else {
//        console.log("一致するモードがありません!");
//      }
//    },
//    [context.state]
//  );
//
//  const draw = new MapboxDraw(context.props);
//  drawRef.current = draw;
//
//  //type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
//  //  position?: ControlPosition;
//
//  //  onCreate?: (evt: { features: object[] }) => void;
//  //  onUpdate?: (evt: { features: object[]; action: string }) => void;
//  //  onDelete?: (evt: { features: object[] }) => void;
//  //};
//
//  useControl(
//    () => {
//      return Draw;
//    },
//
//    ({ map }: { map: MapRef }) => {
//      map.on("draw.create", onUpdate);
//      map.on("draw.update", onUpdate);
//      map.on("draw.delete", onDelete);
//      map.on("draw.modechange", onModeChange);
//    },
//
//    ({ map }: { map: MapRef }) => {
//      map.off("draw.create", onUpdate);
//      map.off("draw.update", onUpdate);
//      map.off("draw.delete", onDelete);
//      map.off("draw.modechange", onModeChange);
//    },
//
//    {
//      //position: context.props.position,
//      position: "top-right",
//    }
//  );
//  return null;
//}
//
//export default DrawControl;
