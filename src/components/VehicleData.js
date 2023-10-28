import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/VehicleDataStyle.css";
import vehicleService from "../service/VehicleService";

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
        const response = await vehicleService.fetchVehicle(id);
        setVehicle(response);
        setVehicleServiceHistory(response.vehicleServiceHistory);
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
        <h1>Vehicle Service Information</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {vehicleServiceHistory.map((historyItem) => (
              <tr key={historyItem.id}>
                <td>{historyItem.serviceDate}</td>
                <td>{historyItem.serviceDescription}</td>
                <td>{historyItem.serviceCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleData;
