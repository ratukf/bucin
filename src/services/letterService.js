import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const letterService = {
  getLetters: async (userId) => {
    const response = await api.get(`/letters?user_id=${userId}&_sort=date`);
    // Reverse the order of data to show the latest first
    // Because fake-json-server returns data in ascending order by default
    return Array.isArray(response.data) ? response.data.reverse() : response.data;
  },
  createLetter: async (letterData) => {
    const response = await api.post('/letters', letterData);
    return response.data;
  },
  getOneLetter: async (id) => {
    const response = await api.get(`/letters/${id}`);
    return response.data;
  },
};

export default api;
