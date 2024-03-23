import { useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { Map } from "maplibre-gl";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="pagina">
        <nav className="navegation">
          <h1>Prueba Tecnica usando libreria Maplibre GL JS</h1>
        </nav>
        <Mapa />
      </div>
    </BrowserRouter>
  );
}

function Mapa() {
  const mapContainerRef = useRef(null);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    const map = new Map({
      container: mapContainerRef.current, // container ref
      style: "https://demotiles.maplibre.org/style.json", // style URL===
      center: [0, 0], // starting position [lng, lat]
      zoom: 1, // starting zoom
    });

    return () => map.remove(); // cleanup on unmount
  }, []); // empty dependency array means this effect runs once, equivalent to componentDidMount

  return (
    <div
      className="mapa"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}

export default App;
