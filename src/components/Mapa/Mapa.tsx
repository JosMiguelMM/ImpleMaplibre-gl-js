import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl, {NavigationControl} from 'maplibre-gl';
import {useEffect, useRef} from 'react';
import {MapLibreSearchControl} from "@stadiamaps/maplibre-search-box";
import "@stadiamaps/maplibre-search-box/dist/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Mapa.css";

const key = "9enKVnnLS2ZOaMAb4cYj";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let corrorigen: number[] = [];
let corrdestino: number[] = [];
const keyRuta = "5b3ce3597851110001cf62480a6f9f8b91f8439eb52a7da46f3275aa";
const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {

    const initializeMap = () => {
      const map = new maplibregl.Map({
        container: mapContainer.current!,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
        center: [0, 0],
        bearing: 45,
        zoom: 4,
      });
      const control = new MapLibreSearchControl({
        onResultSelected: (feature) => {
          const lat = feature.geometry.coordinates[0];
          const lon = feature.geometry.coordinates[1];
          console.log(`Latitud aca : ${lat}, Longitud: ${lon}`);
          corrdestino = [lat, lon];
          console.log("aca", corrorigen, corrdestino);
          if (corrorigen.length > 0 && corrdestino.length > 0) {
            ObtenerRuta(corrorigen, corrdestino, map);
          } else {
            console.log("origen o destino están vacíos");
          }
        },
      });
      map.on(
        'load',
        () => {
          map.addControl(new NavigationControl(), 'bottom-right');                            // botones para aumentar o dismunuir tamaño
          map.addControl(new maplibregl.FullscreenControl(), 'bottom-right');                 // boton para pantalla completa
          map.addControl(new maplibregl.ScaleControl({}), 'bottom-right');                    // escala de la vista
          map.addControl(new maplibregl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: false
            },
            trackUserLocation: true
          }), 'bottom-right');                // boton para geolocalización
          map.addControl(new maplibregl.TerrainControl({source: "terrain"}), 'bottom-right'); // boton para cambiar el tipo de terreno
          map.addControl(control, 'top-left');// buscador de lugares
          CambioPlaceholder();
        });

      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        corrorigen = [lon, lat];
      });
      return map;
    }
    const map = initializeMap();
    return () => map.remove();
  }, []);
  return (
    <div className="mapContainer" ref={mapContainer}>

    </div>);
};

function CambioPlaceholder() {
  const searchInput = document.querySelector('.stadiamaps-search-box .input-container input');
  if (searchInput) {
    searchInput.setAttribute('placeholder', 'lugar, dirección, ciudad...');
  }
}

function ObtenerRuta(origen: number[], destino: number[], map: maplibregl.Map) {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${keyRuta}&start=${origen[0]},${origen[1]}&end=${destino[0]},${destino[1]}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.features[0].geometry);
      console.log("Exito");
      const routeGeometry = data.features[0].geometry;
      if (map.getLayer('route')) {
        // Si la capa ya existe, la elimina
        map.removeLayer('route');
        map.removeSource('route');
      }
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: routeGeometry
          }
        },
        paint: {
          'line-width': 2,
          'line-color': '#007cbf'
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
}


export default Map;
