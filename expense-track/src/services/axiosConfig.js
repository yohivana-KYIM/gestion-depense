import axios from 'axios';

// Récupérez la base URL depuis les variables d'environnement
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important pour les cookies
});

// Ajouter un intercepteur pour inclure le jeton dans les en-têtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ou 'sessionStorage' si vous l'utilisez
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
