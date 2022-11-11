/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { MapContainer, FeatureGroup, ImageOverlay } from 'react-leaflet';
import { Oval } from  'react-loader-spinner';
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
  [1000, 1000],
];
const coordinates = [150, 300];
const style = { height: '68vh', width: '75vw' };

export default function AnnotationTab(props) {
  const { currentCamera, translate, handleSave, frameUrl, appId, onCancel, setIsFormUpdated } = props;  
  const [mapLayers, setMapLayers] = useState([]);

  const [map, setMap] = useState(null);
  const [url, setUrl] = useState(null);
  const [mlApp, setMlApp] = useState(null);
  const [imgBounds, setImgBounds] = useState(bounds);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const featureGroupRef = useRef();

  const initializeLocale = () => {
    L.drawLocal = {
      draw: {
        toolbar: {
          // #TODO: this should be reorganized where actions are nested in actions
          // ex: actions.undo  or actions.cancel
          actions: {
            title: translate('app.actions-title-label'),
            text: translate('app.actions-text-label'),
          },
          finish: {
            title: translate('app.finish-title-label'),
            text: translate('app.finish-text-label'),
          },
          undo: {
            title: translate('app.undo-title-label'),
            text: translate('app.undo-text-label'),
          },
          buttons: {            
            polygon: translate('app.polyline-draw-label'),            
          }
        },
        handlers: {
          circle: {
            tooltip: {
              start: translate('app.circle-tooltip-start-label')
            },
            radius: translate('app.circle-radius-label')
          },
          circlemarker: {
            tooltip: {
              start: translate('app.circlemarker-tooltip-start-label')
            }
          },
          marker: {
            tooltip: {
              start: translate('app.marker-tooltip-start-label')
            }
          },
          polygon: {
            tooltip: {
              start: translate('app.polygon-tooltip-start-label'),
              cont: translate('app.polygon-tooltip-cont-label'),
              end: translate('app.polygon-tooltip-end-label')
            }
          },
          polyline: {
            error: translate('app.polyline-error-label'),
            tooltip: {
              start: translate('app.polyline-tooltip-start-label'),
              cont: translate('app.polyline-tooltip-cont-label'),
              end: translate('app.polyline-tooltip-end-label')
            }
          },
          rectangle: {
            tooltip: {
              start: translate('app.rectangle-tooltip-start-label')
            }
          },
          simpleshape: {
            tooltip: {
              end: translate('app.simple-shape-tooltip-end-label')
            }
          }
        }
      },
      edit: {
        toolbar: {
          actions: {
            save: {
              title: translate('app.save-title-label'),
              text: translate('app.save-text-label')
            },
            cancel: {
              title: translate('app.cancel-title-label'),
              text: translate('app.cancel-text-label')
            },
            clearAll: {
              title: translate('app.clearall-title-label'),
              text: translate('app.clearall-text-label')
            }
          },
          buttons: {
            edit: translate('app.edit-layer-label'),
            editDisabled: translate('app.no-edit-layer-label'),
            remove: translate('app.delete-layer-label'),
            removeDisabled: translate('app.no-delete-layer-label')
          }
        },
        handlers: {
          edit: {
            tooltip: {
              text: translate('app.cancel-handler-text-tooltip-label'),
              subtext: translate('app.cancel-handler-subtext-tooltip-label')
            }
          },
          remove: {
            tooltip: {
              text: translate('app.tooltip-remove-label')
            }
          }
        }
      }
    };
  };

  useEffect(() => {
    setIsLoading(true);
    initializeLocale();       
  }, []);

  useEffect(() => {
    const app = currentCamera.appDtos?.find((item) => item?.id?.toString() === appId);
    setMlApp(app);
  }, [currentCamera]);

  useEffect(() => {
    if (frameUrl) {
      const img = new Image();
      img.src = frameUrl;
      img.onload = function () {
        setHeight(this.height);
        setWidth(this.width);
        const bounds = [
          [0, 0],
          [this.height, this.width],
        ];
        setImgBounds(bounds);
        setUrl(frameUrl);
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
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
      const coordinates = region?.map((item) => [item[0] * width, item[1] * height]);      
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
      setIsFormUpdated(true);
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
    setIsFormUpdated(true);
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
    setIsFormUpdated(true);
  };

  const tansformCordinates = () => {
    let layers = featureGroupRef?.current?.getLayers() || [];
    const cords = layers?.map((item) => {
      const layerLatLngs = item?.getLatLngs();
      return layerLatLngs?.length > 0
        ? layerLatLngs[0].map((latlngs) => {
          const x = (latlngs.lng / width);
          const y = (latlngs.lat / height);
          return [x, y];
        })
        : [];
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
      setIsFormUpdated(false);
    }
  };

  return (
    <Card sx={{ p: 1, pb: 2 }}>
      {isLoading && (
        <Box sx={{ height: 500 }}>
          <Oval
            color="#626262"
            secondaryColor="#e7e4e4"
            wrapperStyle={{ justifyContent: "center", alignItems: "center", height: "100%" }}
            height={36}
            width={36}
          />
        </Box>
      )}
      {!isLoading && url && (
        <>
          <MapContainer
            center={coordinates}
            whenCreated={setMap}
            crs={L.CRS.Simple}
            minZoom={-4}
            bounds={imgBounds}
            style={style}
          >
            <ImageOverlay bounds={imgBounds} url={url} />
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position="topright"
                onCreated={_onCreate}
                onEdited={_onEdited}
                onDeleted={_onDeleted}
                onEditStart={() => setIsFormUpdated(true)}
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
              <Button sx={{ marginRight: 1 }} onClick={onCancel}>{translate('app.camera-cancel-label')}</Button>
              <Button variant="contained" onClick={handleSaveClick}>
                {translate('app.camera-save-label')}
              </Button>
            </Box>
          </Stack>
        </>
      )}
      {!isLoading && !url && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 500 }}>
          <Typography color="textSecondary" variant="subtitle2">
            {translate('app.annotation-tab-empty-placeholder')}
          </Typography>
        </Box>
      )}
    </Card>
  );
}
