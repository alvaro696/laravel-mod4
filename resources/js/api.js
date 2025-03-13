import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Usamos ruta relativa ya que el frontend y backend están en el mismo dominio
});

export default api;
