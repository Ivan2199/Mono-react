import axios from "axios";

const API_BASE_URL = "https://localhost:44317/api/vehicle";

export const fetchVehicleList = async (itemsPerPage, currentPage) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/?pageSize=${itemsPerPage}&pageNumber=${currentPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja podataka o vozilima: ", error);
    throw error;
  }
};

export const fetchVehicle = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja podataka o vozilima: ", error);
    throw error;
  }
};

export const insertVehicleData = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/`, formData);
    return response.data;
  } catch (error) {
    console.error("Greška prilikom umetanja podataka o vozilima: ", error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    return await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Greška prilikom brisanja podataka o vozilima: ", error);
    throw error;
  }
};

export const updateVehicle = async (id, updatedData) => {
  try {
    return await axios.put(`${API_BASE_URL}/${id}`, updatedData);
  } catch (error) {
    console.error("Greška prilikom ažuriranja podataka o vozilima: ", error);
    throw error;
  }
};
export default {
  deleteVehicle,
  fetchVehicleList,
  fetchVehicle,
  insertVehicleData,
  updateVehicle,
};
