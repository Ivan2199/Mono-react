import "./App.css";
import Vehicles from "./components/Vehicles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VehicleData from "./components/VehicleData";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Vehicles />} />
          <Route path="/VehicleData/:id" element={<VehicleData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
