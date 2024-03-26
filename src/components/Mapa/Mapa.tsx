import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl, {NavigationControl} from 'maplibre-gl';
import {useEffect, useRef} from 'react';
import {MapLibreSearchControl} from "@stadiamaps/maplibre-search-box";
import "@stadiamaps/maplibre-search-box/dist/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Mapa.css";

const key = "9enKVnnLS2ZOaMAb4cYj"
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
      const control = new MapLibreSearchControl();

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

export default Map;
