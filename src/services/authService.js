import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (email, password) => {
    const response = await api.get(`/user?email=${email}&password=${password}`);
    return response.data;
  },
  signup: async (userData) => {
    const response = await api.post('/user', userData);
    return response.data;
  },
  getUser: async (userId) => {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },
};

export default api;
