import { createSlice } from '@reduxjs/toolkit';
import { authAsyncAction } from './authAsyncAction';

const initialState = {
  data: {
    user: [],
    letters: [],
    lettersDetail: {},
  },
  status: {
    user: {
      login: 'IDLE',
      signup: 'IDLE',
    },
    letters: {
      create: false,
      update: false,
      delete: false,
    },
  },
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatus(state, action) {
      const { type, status } = action.payload;
      if (state.status[type]) {
        state.status[type] = status;
      }
    },
    logout(state) {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAsyncAction.pending, (state) => {
        state.status.user.login = 'PENDING';
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(authAsyncAction.fulfilled, (state, action) => {
        state.status.user.login = 'SUCCESS';
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(authAsyncAction.rejected, (state, action) => {
        state.status.user.login = 'REJECTED';
        state.user = null;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setStatus } = authSlice.actions;
export default authSlice.reducer;
