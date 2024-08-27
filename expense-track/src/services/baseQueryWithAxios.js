
import axiosInstance from './axiosConfig';
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url, // Ajoutez `baseUrl` avant l'url pour les appels relatifs
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;

      // Retourner une erreur détaillée si disponible
      return {
        error: {
          status: err.response?.status || 'UNKNOWN_ERROR',
          data: err.response?.data || err.message || 'Une erreur inconnue est survenue',
        },
      };
    }
  };

export default axiosBaseQuery;
