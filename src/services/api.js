import axios from "axios";

const API = "https://student-growth-institute-api.onrender.com";

axios.post(`${API}/api/auth/register`, data);

// Register
export const registerUser = (payload) => {
  return axios.post(`${API_BASE}/auth/register`, payload);
};

// Login
export const LoginUser = (payload) => {
  return axios.post(`${API_BASE}/auth/login`, payload);
};

// Upload material
export const uploadMaterial = (formData) => {
  return axios.post(`${API_BASE}/materials/upload`, formData);
};

// Get materials
//export const getMaterials = (classRange, subject) => {
 // return axios.get(`${API_BASE}/materials/${classRange}/${subject}`);
//};