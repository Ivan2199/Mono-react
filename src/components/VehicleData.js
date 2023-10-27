import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/VehicleDataStyle.css";

function VehicleData() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState({
    id: "",
    vehicleType: "",
    vehicleBrand: "",
    yearOfProduction: "",
    topSpeed: "",
    vehicleMileage: "",
    vehicleOwner: "",
  });
  const [vehicleServiceHistory, setVehicleServiceHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://localhost:44317/api/vehicle/${id}`
        );
        const vehicleData = response.data;
        setVehicle(vehicleData);
        setVehicleServiceHistory(vehicleData.vehicleServiceHistory);
      } catch (error) {
        console.error("Error fetching vehicle data: ", error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="showOneVehicle">
      <h1>Vehicle Information</h1>
      <div className="vehicleInformation">
        <p>Vehicle Type: {vehicle.vehicleType}</p>
        <p>Vehicle Brand: {vehicle.vehicleBrand}</p>
        <p>Vehicle Year Of Production: {vehicle.yearOfProduction}</p>
        <p>Vehicle Top Speed: {vehicle.topSpeed}</p>
        <p>Vehicle Mileage: {vehicle.vehicleMileage}</p>
        <p>Vehicle Owner: {vehicle.vehicleOwner}</p>
      </div>
      <div>
        <h2>Service History</h2>
        <ul>
          {vehicleServiceHistory.map((historyItem) => (
            <li key={historyItem.id}>
              <p>Date: {historyItem.serviceDate}</p>
              <p>Description: {historyItem.serviceDescription}</p>
              <p>Cost: {historyItem.serviceCost}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VehicleData;
