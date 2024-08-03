import React, { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";

import {
  calculatePolygon,
  clearRenderedMap,
  uploadGeoJsonFile,
} from "../utils/parseGeoJson";
import {
  DashboardButton,
  MapContainer,
} from "../styledComponent/dashboardPage";

const Map = (props) => {
  const { type, postJsonData, uploadedJson, cbClearRenderedMap, ...rest } =
    props;

  const [lineStrings, setLineStrings] = useState([]);
  const [polyLines, setPolyLines] = useState([]);
  const [polygon, setPolygon] = useState("");
  const mapRef = useRef();
  const map = useRef();
  const inputRef = useRef();

  const clearMap = () => {
    // To clear uploaded json from map
    if (type === "uploaded") {
      cbClearRenderedMap(map.current);
    } else {
      polyLines?.forEach((polyline) => {
        if (polyline && map.current) map.current?.removeObject?.(polyline);
      });

      if (polygon) {
        map.current.removeObject(polygon);
        setPolygon("");
      }

      setLineStrings([]);
      setPolyLines([]);

      clearRenderedMap(map.current);
    }
  };

  const uploadFile = async (e) => {
    uploadGeoJsonFile(e.target.files, map.current, async (response) => {
      try {
        await postJsonData(response);
      } catch (err) {
        console.log("Error in upload of geo file data\n", err.message);
      }
    });
  };

  /**
   * @function removePolylineFromMap
   * @description Implement Undo functionality
   */
  // eslint-disable-next-line no-unused-vars
  const removePolylineFromMap = () => {
    const updatedLineStrings = [...lineStrings];
    const updatedPolyLines = [...polyLines];

    const lastCoordinate = updatedLineStrings.pop();
    const lastPolyline = updatedPolyLines.pop();

    if (lastCoordinate && lastPolyline) {
      map.current.removeObject(lastPolyline);

      setLineStrings(updatedLineStrings);
      setPolyLines(updatedPolyLines);
    }
  };

  const generatePolygon = async () => {
    let lineString = new H.geo.LineString();

    for (let i = 0; i < lineStrings.length; i++) {
      lineString.pushPoint(lineStrings[i]);
    }

    if (lineStrings.length > 1) {
      let polygon = new H.map.Polygon(lineString, {
        style: { lineWidth: 4 },
      });

      for (let i = 0; i < polyLines.length; i++) {
        if (polyLines[i]) {
          map.current.removeObject(polyLines[i]);
        }
      }
      setLineStrings([]);
      setPolyLines([]);

      setPolygon(polygon);

      map.current.addObject(polygon);

      generateGeoJson(polygon);
    }
  };

  const generateGeoJson = async (polygon) => {
    try {
      const coordinates = polygon
        .getGeometry()
        .getExterior()
        .getLatLngAltArray();

      const polyPoints = [];
      for (let i = 0; i < coordinates.length; i = i + 3) {
        polyPoints.push([coordinates[i + 1], coordinates[i]]);
      }

      const geoJSON = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [polyPoints],
        },
      };

      await postJsonData(geoJSON);

      // map.current.removeObject(polygon);
      // setPolygon("");
    } catch {}
  };

  useEffect(() => {
    function setInteractive() {
      map.current.addEventListener("tap", (evt) => {
        const coord = map.current.screenToGeo(
          evt.currentPointer.viewportX,
          evt.currentPointer.viewportY
        );

        setPolygon((prevPoly) => {
          if (prevPoly) {
            map.current.removeObject(prevPoly);
          }
          return "";
        });

        if (polygon) {
          map.current.removeObject(polygon);
        }
        setLineStrings((prevState) => {
          const updatedLineStrings = [...prevState, coord];
          return updatedLineStrings;
        });
      });
    }

    function changeMousePointerEnter() {
      map.current.getViewPort().element.style.cursor = "pointer";
    }
    function changeMousePointerLeave() {
      map.current.getViewPort().element.style.cursor = "default";
    }

    if (!map.current) {
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_GAIA_API_KEY,
      });
      const layers = platform.createDefaultLayers();
      const { lat, lng, zoom } = rest;

      const mapObj = new H.Map(mapRef.current, layers.vector.normal.map, {
        zoom,
        center: { lat, lng },
        pixelRatio: window.devicePixelRatio,
      });

      window.addEventListener("resize", () => mapObj.getViewPort().resize());

      // add the interactive behavior to the map
      new H.mapevents.Behavior(new H.mapevents.MapEvents(mapObj));

      // Below comment is to load default layout
      // let ui = H.ui.UI.createDefault(mapObj, layers);
      // ui.getControl("zoom").setAlignment(H.ui.LayoutAlignment.BOTTOM_RIGHT);

      // load uploaded json to map
      if (type === "uploaded" && uploadedJson) {
        calculatePolygon(uploadedJson, mapObj);
      }

      // change mouse pointer
      if (type === "draw") {
        mapObj.addEventListener("pointerenter", changeMousePointerEnter);
      }

      map.current = mapObj;

      if (type === "draw") {
        setInteractive();
      }
    }

    return () => {
      if (map.current) {
        window.removeEventListener("resize", () =>
          map.current.getViewPort().resize()
        );
        if (type === "draw") {
          map.current.addEventListener("pointerenter", changeMousePointerLeave);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Render lineString to Map
    if (lineStrings.length) {
      let lineString = new H.geo.LineString();

      for (let i = 0; i < lineStrings.length; i++) {
        lineString.pushPoint(lineStrings[i]);
      }

      if (lineStrings.length > 1) {
        let polyline = new H.map.Polyline(lineString, {
          // style: { lineWidth: 4 },
        });

        map.current.addObject(polyline);

        const updatedPolyLines = [...polyLines, polyline];
        setPolyLines(updatedPolyLines);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineStrings]);

  return (
    <MapContainer ref={mapRef}>
      <DashboardButton
        sx={{
          left: "10px",
          top: "10px",
        }}
        variant="contained"
        type="button"
        onClick={clearMap}
      >
        Clear map
      </DashboardButton>
      {type === "draw" ? (
        <DashboardButton
          disabled={lineStrings.length < 3}
          variant="contained"
          type="button"
          sx={{
            right: "10px",
            top: "10px",
          }}
          onClick={generatePolygon}
        >
          Mark Territory
        </DashboardButton>
      ) : null}
      {type === "upload" ? (
        <>
          <input
            ref={inputRef}
            type="file"
            // accept=".geojson"
            multiple={false}
            style={{ width: "0", height: "0", display: "none" }}
            onChange={uploadFile}
          />
          <DashboardButton
            variant="contained"
            type="button"
            sx={{
              right: "10px",
              top: "10px",
            }}
            onClick={() => inputRef.current.click()}
          >
            Upload
          </DashboardButton>
        </>
      ) : null}
    </MapContainer>
  );
};

export default Map;
