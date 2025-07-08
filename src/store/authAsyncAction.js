import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService as AuthSvc } from '../services/authService';

export const authAsyncAction = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await AuthSvc(email, password);
      if (!data || !Array.isArray(data) || data.length === 0) {
        return rejectWithValue('Wrong email or password');
      }
      return data[0];
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);
