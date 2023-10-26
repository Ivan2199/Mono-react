import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import "../style/InsertForm.css";

function InsertForm({ setVehicleList }) {
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleBrand: "",
    YearOfProduction: "",
    TopSpeed: "",
    VehicleMileage: "",
    VehicleOwner: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.vehicleType.trim() === "" ||
      formData.vehicleBrand.trim() === "" ||
      formData.YearOfProduction.trim() === "" ||
      formData.TopSpeed.trim() === "" ||
      formData.VehicleMileage.trim() === "" ||
      formData.VehicleOwner.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:44317/api/vehicle",
        formData
      );

      setVehicleList(response.data);
      setFormData({
        vehicleType: "",
        vehicleBrand: "",
        YearOfProduction: "",
        TopSpeed: "",
        VehicleMileage: "",
        VehicleOwner: "",
      });
    } catch (error) {
      console.error("Error inserting vehicle data: ", error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <p>Enter Vehicle Type:</p>
        <input
          type="text"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleInputChange}
          required
        />
        <p>Enter Vehicle Brand:</p>
        <input
          type="text"
          name="vehicleBrand"
          value={formData.vehicleBrand}
          onChange={handleInputChange}
          required
        />
        <p>Enter Year of Production:</p>
        <input
          type="text"
          name="YearOfProduction"
          value={formData.YearOfProduction}
          onChange={handleInputChange}
          required
        />
        <p>Enter Top Speed:</p>
        <input
          type="text"
          name="TopSpeed"
          value={formData.TopSpeed}
          onChange={handleInputChange}
          required
        />
        <p>Enter Vehicle Mileage:</p>
        <input
          type="text"
          name="VehicleMileage"
          value={formData.VehicleMileage}
          onChange={handleInputChange}
          required
        />
        <p>Enter Vehicle Owner:</p>
        <input
          type="text"
          name="VehicleOwner"
          value={formData.VehicleOwner}
          onChange={handleInputChange}
          required
        />
        <Button name="Submit" type="submit" />
      </form>
    </div>
  );
}

export default InsertForm;
