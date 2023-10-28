import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "../style/VehicleList.css";
import vehicleService from "../service/VehicleService";

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
        const response = await vehicleService.fetchVehicleList(
          itemsPerPage,
          currentPage
        );
        setVehicleList(response);
        setTotalSize(response[1].totalSize);
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

  const handleSave = async () => {
    const updatedList = [...vehicleList];
    const index = updatedList.findIndex((vehicle) => vehicle.id === editIndex);
    if (index !== -1) {
      try {
        await vehicleService.updateVehicle(editIndex, editedVehicle);
        const response = await vehicleService.fetchVehicleList(
          itemsPerPage,
          currentPage
        );
        setVehicleList(response);
        setTotalSize(response[1].totalSize);
      } catch (error) {
        console.error("Error deleting vehicle data: ", error);
      }
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
      await vehicleService.deleteVehicle(id);
      const response = await vehicleService.fetchVehicleList(
        itemsPerPage,
        currentPage
      );
      setVehicleList(response);
      setTotalSize(response[1].totalSize);
    } catch (error) {
      console.error("Error deleting vehicle data: ", error);
    }
  };

  const totalPages = Math.ceil(totalSize / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="vehicleList">
      <h1>List Of Vehicles</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Brand</th>
            <th>Year of Production</th>
            <th>Top Speed</th>
            <th>Vehicle Mileage</th>
            <th>Vehicle Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(vehicleList) && vehicleList.length > 0 ? (
            vehicleList.map((vehicle) => (
              <tr key={vehicle.id}>
                {vehicle.id === editIndex ? (
                  <React.Fragment>
                    <td>
                      <input
                        type="text"
                        name="vehicleType"
                        value={editedVehicle.vehicleType}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="vehicleBrand"
                        value={editedVehicle.vehicleBrand}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="yearOfProduction"
                        value={editedVehicle.yearOfProduction}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="topSpeed"
                        value={editedVehicle.topSpeed}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="vehicleMileage"
                        value={editedVehicle.vehicleMileage}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="vehicleOwner"
                        value={editedVehicle.vehicleOwner}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <Button name="Save" onClick={handleSave} />
                      <Button name="Cancel" onClick={handleCancelEdit} />
                    </td>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <td>{vehicle.vehicleType}</td>
                    <td>{vehicle.vehicleBrand}</td>
                    <td>{vehicle.yearOfProduction}</td>
                    <td>{vehicle.topSpeed}</td>
                    <td>{vehicle.vehicleMileage}</td>
                    <td>{vehicle.vehicleOwner}</td>
                    <td>
                      <Button
                        name="Edit"
                        onClick={() => handleEdit(vehicle.id)}
                      />
                      <Button
                        name="Delete"
                        onClick={() => handleDelete(vehicle.id)}
                      />
                      <Link to={`/VehicleData/${vehicle.id}`}>Details</Link>
                    </td>
                  </React.Fragment>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">There is no data</td>
            </tr>
          )}
        </tbody>
      </table>
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
