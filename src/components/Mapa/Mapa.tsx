import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl, {NavigationControl} from 'maplibre-gl';
import {useEffect, useRef} from 'react';
import "./Mapa.css";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initializeMap = () => {
      const map = new maplibregl.Map({
        container: mapContainer.current!,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
        center: [-60.5, 40],
        zoom: 4,
      });
      map.on(
        'load',
        () => {
          map.addControl(new NavigationControl(), 'bottom-right');             //botones para aumentar o dismunuir tamaño
          map.addControl(new maplibregl.FullscreenControl(), 'bottom-right');  // boton para pantalla completa
          map.addControl(new maplibregl.ScaleControl({}), 'bottom-right');     // escala de la vista
        });
      return map;
    }

      const map = initializeMap();

      return () => map.remove();
    }, []
  )
    ;

    return <div className="mapContainer" ref={mapContainer}/>;
  };

  export default Map;
