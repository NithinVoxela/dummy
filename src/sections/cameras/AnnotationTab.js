/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Circle, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';

L.CRS.MySimple = L.extend({}, L.CRS.Simple, {
  // At zoom 0, tile 268x268px should represent the entire "world" of size 8576x8576.
  // scale is therefore 8576 / 268 = 32 (use the reverse in transformation, i.e. 1/32).
  // We want the center of tile 0/0/0 to be coordinates [0, 0], so offset is 8576 * 1/32 / 2 = 268 / 2 = 134.
  transformation: new L.Transformation(1, 0, 1, 0),
});

const bounds = [
  [0, 0],
  [340, 640],
];
const coordinates = [150, 300];
const style = { height: '80vh', width: '75vw' };

export default function AnnotationTab(props) {
  const { currentCamera, translate, handleSave, frameUrl, appId } = props;
  const [mapLayers, setMapLayers] = useState([]);

  const [map, setMap] = useState(null);
  const [url, setUrl] = useState(null);
  const [mlApp, setMlApp] = useState(null);
  const featureGroupRef = useRef();

  useEffect(() => {
    const app = currentCamera.appDtos?.find((item) => item?.id?.toString() === appId);
    setMlApp(app);
  }, [currentCamera]);

  useEffect(() => {
    if (frameUrl) {
      setUrl(frameUrl);
    }     
  }, [frameUrl]);

  useEffect(() => {
    if (!map || !mlApp || !mlApp.config) return;
    try {
      const regionOfInterest = JSON.parse(mlApp.config?.regionOfInterest);
      const geoJsonData = getGeoJson(regionOfInterest);
      if (geoJsonData) {
        let leafletGeoJSON = new L.GeoJSON(geoJsonData);
        let leafletFG = featureGroupRef?.current;

        leafletGeoJSON.eachLayer((layer) => {
          leafletFG.addLayer(layer);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [map, mlApp]);

  const getGeoJson = (regionOfInterest) => {
    let features = [];
    features = regionOfInterest?.map((region) => {
      const coordinates = region?.map((item) => [item[0], item[1]]);
      return {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
      };
    });

    return features;
  };

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0] }]);
    }
  };

  const _onEdited = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) => (l.id === _leaflet_id ? { ...l, latlngs: { ...editing.latlngs[0] } } : l))
      );
    });
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  const tansformCordinates = () => {
    let layers = featureGroupRef?.current?.getLayers() || [];
    const cords = layers?.map((item) => {
      const layerLatLngs = item?.getLatLngs();
      return layerLatLngs?.length > 0 ? layerLatLngs[0].map((latlngs) => [Math.floor(latlngs.lng), Math.floor(latlngs.lat)]) : [];
    });
    return cords;
  };

  const handleSaveClick = () => {
    let data = tansformCordinates();
    if (mlApp?.config) {
      const payload = {
        ...mlApp.config,
        regionOfInterest: JSON.stringify(data),
        cameraId: currentCamera?.publicId,
        appId: mlApp.app.id,
      };
      handleSave(payload);
    }
  };

  return (
    <Card sx={{ p: 1, pb: 2 }}>
     { url && 
      <>
        <MapContainer
            center={coordinates}
            whenCreated={setMap}
            crs={L.CRS.Simple}
            minZoom={-4}
            bounds={bounds}
            style={style}            
          >
            <ImageOverlay bounds={bounds} url={url} />
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position="topright"
                onCreated={_onCreate}
                onEdited={_onEdited}
                onDeleted={_onDeleted}
                draw={{
                  rectangle: false,
                  polyline: false,
                  circle: false,
                  circlemarker: false,
                  marker: false,
                }}
              />
            </FeatureGroup>
          </MapContainer>
          <Stack spacing={3} alignItems="flex-end">
            <Box sx={{ display: 'flex', marginTop: 2, marginRight: 2 }}>
              <Button sx={{ marginRight: 1 }}>{translate('app.camera-cancel-label')}</Button>
              <Button variant="contained" onClick={handleSaveClick}>
                {translate('app.camera-save-label')}
              </Button>
            </Box>
          </Stack>
        </>
      }
      { !url && 
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 500 }}>
          <Typography color="textSecondary" variant="subtitle2">
            {translate('app.annotation-tab-empty-placeholder')}
          </Typography>
        </Box>
      }
    </Card>
  );
}
