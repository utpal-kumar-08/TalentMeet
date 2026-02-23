import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;
const baseURL = apiBaseUrl && !apiBaseUrl.endsWith("/") ? `${apiBaseUrl}/` : apiBaseUrl;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;