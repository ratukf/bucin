import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = async (email, password) => {
  const response = await api.get(`/user?email=${email}&password=${password}`, { email, password });
  return response.data;
};

export default api;
