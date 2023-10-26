import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import "../style/InsertForm.css";

function InsertForm({ setVehicleList }) {
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleBrand: "",
    yearOfProduction: "",
    topSpeed: "",
    vehicleMileage: "",
    vehicleOwner: "",
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
      formData.yearOfProduction.trim() === "" ||
      formData.topSpeed.trim() === "" ||
      formData.vehicleMileage.trim() === "" ||
      formData.vehicleOwner.trim() === ""
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
        yearOfProduction: "",
        topSpeed: "",
        vehicleMileage: "",
        vehicleOwner: "",
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
          name="yearOfProduction"
          value={formData.yearOfProduction}
          onChange={handleInputChange}
          required
        />
        <p>Enter Top Speed:</p>
        <input
          type="text"
          name="topSpeed"
          value={formData.topSpeed}
          onChange={handleInputChange}
          required
        />
        <p>Enter Vehicle Mileage:</p>
        <input
          type="text"
          name="vehicleMileage"
          value={formData.vehicleMileage}
          onChange={handleInputChange}
          required
        />
        <p>Enter Vehicle Owner:</p>
        <input
          type="text"
          name="vehicleOwner"
          value={formData.vehicleOwner}
          onChange={handleInputChange}
          required
        />
        <Button name="Submit" type="submit" />
      </form>
    </div>
  );
}

export default InsertForm;
