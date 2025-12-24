// File: src/features/vehicles/vehicleService.js
import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001') + '/api/vehicles/';

// Get all vehicles
const getVehicles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a vehicle (Admin)
const createVehicle = async (vehicleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, vehicleData, config);
  return response.data;
};

// Delete a vehicle (Admin)
const deleteVehicle = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const vehicleService = {
  getVehicles,
  createVehicle,
  deleteVehicle,
};

export default vehicleService;