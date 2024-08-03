import H from "@here/maps-api-for-javascript";
import toast from "react-hot-toast";

var polygonPoints = [],
  polygonObjs = [];

const loopPolygon = (arr) => {
  for (let j = 0; j < arr.length; j++) {
    polygonPoints.push(arr[j]);
  }
};

const loopOnFeatures = (geometry) => {
  if (geometry.type === "Polygon") {
    loopPolygon(geometry.coordinates);
  } else if (geometry.type === "MultiPolygon") {
    for (let k = 0; k < geometry.coordinates.length; k++) {
      loopPolygon(geometry.coordinates[k]);
    }
  }
};

const generateSinglePolygon = (arr, map, condition) => {
  let lineString = new H.geo.LineString();

  arr.forEach((point) => {
    lineString.pushLatLngAlt(point[1], point[0], 0);
  });

  const polygon = new H.map.Polygon(lineString);

  if (condition && polygon?.getBoundingBox()) {
    map?.getViewModel()?.setLookAtData({ bounds: polygon.getBoundingBox() });
  }

  polygonObjs.push(polygon);
  map.addObject(polygon);
};

const generatePolygons = (polygons, map, callback) => {
  if (polygons.length > 0) {
    for (let i = 0; i < polygons.length; i++) {
      generateSinglePolygon(polygons[i], map, i + 1 === polygons.length);
    }
  }

  const geoJSON = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: polygonPoints,
    },
  };

  if (typeof callback === "function") {
    callback(geoJSON);
  }
};

export function calculatePolygon(json, map, callback) {
  polygonPoints = [];
  polygonObjs = [];

  if (json.type === "FeatureCollection") {
    for (let i = 0; i < json.features.length; i++) {
      loopOnFeatures(json.features[i].geometry);
    }
  } else if (json.type === "Feature") {
    loopOnFeatures(json.geometry);
  } else if (json.type === "GeometryCollection") {
    for (let l = 0; l < json.geometries.length; l++) {
      loopOnFeatures(json.geometries[l]);
    }
  }

  generatePolygons(polygonPoints, map, callback);
}

export function uploadGeoJsonFile(files, map, callback) {
  if (files.length === 0) {
    return;
  }

  const file = files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const fileContent = event.target.result;
      const geoJSON = JSON.parse(fileContent);

      calculatePolygon(geoJSON, map, callback);
    } catch (err) {
      toast.error("Unexpected Geo Json file uploaded. Please check file.");
    }
  };

  reader.readAsText(file);
}

export function clearRenderedMap(map) {
  polygonObjs.forEach((polygon) => {
    map.removeObject(polygon);
  });
  polygonPoints = [];
  polygonObjs = [];
}
