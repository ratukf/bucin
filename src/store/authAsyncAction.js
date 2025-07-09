import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

export const authAsyncAction = {
  login: createAsyncThunk('auth/login', async ({ email, password }) => {
    const data = await authService.login(email, password);
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Wrong email or password');
    }
    return data[0];
  }),
  signup: createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.signup(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || 'Signup failed');
    }
  }),
  getUser: createAsyncThunk('auth/getUser', async (userId) => {
    try {
      const data = await authService.getUser(userId);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || 'Failed to fetch user data');
    }
  }),
  getPartner: createAsyncThunk('auth/getPartner', async (partnerId) => {
    try {
      const data = await authService.getUser(partnerId);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || 'Failed to fetch partner data');
    }
  }),
};
