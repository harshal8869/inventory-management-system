import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-backend-fot7.onrender.com"
});

export default api;