import React, { useState, useEffect } from "react";
import Button from "./Button";
import "../style/VehicleList.css";
import axios from "axios";

function VehicleList() {
  const [vehicleList, setVehicleList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedVehicle, setEditedVehicle] = useState({
    id: "",
    vehicleType: "",
    vehicleBrand: "",
    yearOfProduction: "",
    topSpeed: "",
    vehicleMileage: "",
    vehicleOwner: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44317/api/vehicle/?pageSize=30"
        );
        const vehicleData = response.data;
        setVehicleList(vehicleData);
      } catch (error) {
        console.error("Error fetching vehicle data: ", error);
      }
    };

    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedVehicle({
      ...vehicleList[index],
    });
  };

  const handleSave = () => {
    const updatedList = [...vehicleList];
    updatedList[editIndex] = editedVehicle;
    setEditIndex(-1);
    setEditedVehicle({
      vehicleType: "",
      vehicleBrand: "",
      yearOfProduction: "",
      topSpeed: "",
      vehicleMileage: "",
      vehicleOwner: "",
    });
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setEditedVehicle({
      vehicleType: "",
      vehicleBrand: "",
      yearOfProduction: "",
      topSpeed: "",
      vehicleMileage: "",
      vehicleOwner: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVehicle({
      ...editedVehicle,
      [name]: value,
    });
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(
        `https://localhost:44317/api/vehicle/${vehicleList[index].Id}`
      );
      setVehicleList(response.data);
    } catch (error) {
      console.error("Error deleting vehicle data: ", error);
    }
  };

  return (
    <div className="vehicleList">
      <h1>List Of Vehicles</h1>
      <ul>
        {Array.isArray(vehicleList) && vehicleList.length > 0 ? (
          vehicleList.map((vehicle, index) => (
            <li key={index}>
              {index === editIndex ? (
                <div>
                  <p>Type: </p>
                  <input
                    type="text"
                    name="VehicleType"
                    value={editedVehicle.vehicleType}
                    onChange={handleInputChange}
                  />
                  <p>Brand: </p>
                  <input
                    type="text"
                    name="VehicleBrand"
                    value={editedVehicle.vehicleBrand}
                    onChange={handleInputChange}
                  />
                  <p>Year of Production: </p>
                  <input
                    type="text"
                    name="YearOfProduction"
                    value={editedVehicle.yearOfProduction}
                    onChange={handleInputChange}
                  />
                  <p>Top Speed: </p>
                  <input
                    type="text"
                    name="TopSpeed"
                    value={editedVehicle.topSpeed}
                    onChange={handleInputChange}
                  />
                  <p>Vehicle Mileage: </p>
                  <input
                    type="text"
                    name="VehicleMileage"
                    value={editedVehicle.vehicleMileage}
                    onChange={handleInputChange}
                  />
                  <p>Vehicle Owner: </p>
                  <input
                    type="text"
                    name="VehicleOwner"
                    value={editedVehicle.vehicleOwner}
                    onChange={handleInputChange}
                  />
                  <Button name="Save" onClick={handleSave} />
                  <Button name="Cancel" onClick={handleCancelEdit} />
                </div>
              ) : (
                <div>
                  Type: {vehicle.VehicleType}, Brand: {vehicle.VehicleBrand},
                  Year of Production: {vehicle.YearOfProduction}, Top Speed:{" "}
                  {vehicle.TopSpeed}, Vehicle Mileage: {vehicle.VehicleMileage},
                  Vehicle Owner: {vehicle.VehicleOwner}
                  <Button name="Edit" onClick={() => handleEdit(index)} />
                  <Button name="Delete" onClick={() => handleDelete(index)} />
                </div>
              )}
            </li>
          ))
        ) : (
          <p>Deleting...</p>
        )}
      </ul>
    </div>
  );
}

export default VehicleList;
