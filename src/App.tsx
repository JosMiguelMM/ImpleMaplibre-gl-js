import {BrowserRouter} from "react-router-dom";
import Mapa from "./components/Mapa/Mapa.tsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="pagina">
        <nav className="navegation">
          <h1>Prueba Tecnica usando libreria Maplibre GL JS</h1>
        </nav>
        <Mapa/>
      </div>
    </BrowserRouter>
  );
}
export default App;
