import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://drive-hive-backend.vercel.app/", 
  withCredentials: true, 
});

export default axiosInstance;
