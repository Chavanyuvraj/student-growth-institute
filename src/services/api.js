import axios from "axios";

const API = "https://student-growth-institute-api.onrender.com";

export const loginUser = (data) =>
  axios.post(`${API}/api/auth/login`, data);

export const registerUser = (data) =>
  axios.post(`${API}/api/auth/register`, data);

export const uploadMaterial = (formData) =>
  axios.post(`${API}/api/materials/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// Get materials
//export const getMaterials = (classRange, subject) => {
 // return axios.get(`${API_BASE}/materials/${classRange}/${subject}`);
//};