import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import Button from "./Button";
import "../style/VehicleList.css";
import VehicleData from "../components/VehicleData";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44317/api/vehicle/?pageSize=${itemsPerPage}&pageNumber=${currentPage}`
        );
        const vehicleData = response.data;
        setVehicleList(vehicleData);
        setTotalSize(vehicleData[1].totalSize);
      } catch (error) {
        console.error("Error fetching vehicle data: ", error);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleEdit = (id) => {
    setEditIndex(id);
    setEditedVehicle({
      ...vehicleList.find((vehicle) => vehicle.id === id),
    });
  };

  const handleSave = () => {
    const updatedList = [...vehicleList];
    const index = updatedList.findIndex((vehicle) => vehicle.id === editIndex);
    if (index !== -1) {
      updatedList[index] = editedVehicle;
      setVehicleList(updatedList);
    }
    setEditIndex(-1);
    setEditedVehicle({
      id: "",
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
      id: "",
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:44317/api/vehicle/${id}`);
      const updatedList = vehicleList.filter((vehicle) => vehicle.id !== id);
      setVehicleList(updatedList);
    } catch (error) {
      console.error("Error deleting vehicle data: ", error);
    }
  };

  const totalPages = Math.ceil(totalSize / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="vehicleList">
      <h1>List Of Vehicles</h1>

      <ul>
        {Array.isArray(vehicleList) && vehicleList.length > 0 ? (
          vehicleList.map((vehicle) => (
            <li key={vehicle.id}>
              {vehicle.id === editIndex ? (
                <div>
                  <p>Type: </p>
                  <input
                    type="text"
                    name="vehicleType"
                    value={editedVehicle.vehicleType}
                    onChange={handleInputChange}
                  />
                  <p>Brand: </p>
                  <input
                    type="text"
                    name="vehicleBrand"
                    value={editedVehicle.vehicleBrand}
                    onChange={handleInputChange}
                  />
                  <p>Year of Production: </p>
                  <input
                    type="text"
                    name="yearOfProduction"
                    value={editedVehicle.yearOfProduction}
                    onChange={handleInputChange}
                  />
                  <p>Top Speed: </p>
                  <input
                    type="text"
                    name="topSpeed"
                    value={editedVehicle.topSpeed}
                    onChange={handleInputChange}
                  />
                  <p>Vehicle Mileage: </p>
                  <input
                    type="text"
                    name="vehicleMileage"
                    value={editedVehicle.vehicleMileage}
                    onChange={handleInputChange}
                  />
                  <p>Vehicle Owner: </p>
                  <input
                    type="text"
                    name="vehicleOwner"
                    value={editedVehicle.vehicleOwner}
                    onChange={handleInputChange}
                  />

                  <Button name="Save" onClick={handleSave} />
                  <Button name="Cancel" onClick={handleCancelEdit} />
                </div>
              ) : (
                <div>
                  <Link to={`/VehicleData/${vehicle.id}`}>
                    Type: {vehicle.vehicleType}, Brand: {vehicle.vehicleBrand},
                    Year of Production: {vehicle.yearOfProduction}, Top Speed:{" "}
                    {vehicle.topSpeed}, Vehicle Mileage:{" "}
                    {vehicle.vehicleMileage}, Vehicle Owner:{" "}
                    {vehicle.vehicleOwner}
                  </Link>
                  <Button name="Edit" onClick={() => handleEdit(vehicle.id)} />
                  <Button
                    name="Delete"
                    onClick={() => handleDelete(vehicle.id)}
                  />
                </div>
              )}
            </li>
          ))
        ) : (
          <p>There is no data</p>
        )}
      </ul>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            name={number.toString()}
            onClick={() => setCurrentPage(number)}
          />
        ))}
      </div>
    </div>
  );
}

export default VehicleList;
