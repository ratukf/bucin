import { createSlice } from '@reduxjs/toolkit';
import { authAsyncAction } from './authAsyncAction';

const initialState = {
  data: {
    user: [],
    letters: [],
    lettersDetail: {},
    userDetail: {},
  },
  status: {
    user: {
      login: 'IDLE',
      signup: 'IDLE',
    },
    userDetail: 'IDLE',
    letters: {
      create: 'IDLE',
      update: 'IDLE',
      delete: 'IDLE',
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
      .addCase(authAsyncAction.login.pending, (state) => {
        state.status.user.login = 'PENDING';
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(authAsyncAction.login.fulfilled, (state, action) => {
        state.status.user.login = 'SUCCESS';
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(authAsyncAction.login.rejected, (state, action) => {
        state.status.user.login = 'REJECTED';
        state.user = null;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      })
      .addCase(authAsyncAction.signup.pending, (state) => {
        state.status.user.signup = 'PENDING';
        state.error = null;
      })
      .addCase(authAsyncAction.signup.fulfilled, (state) => {
        state.status.user.signup = 'SUCCESS';
        state.error = null;
      })
      .addCase(authAsyncAction.signup.rejected, (state, action) => {
        state.status.user.signup = 'REJECTED';
        state.user = null;
        state.error = action.payload || 'Signup failed';
      })
      .addCase(authAsyncAction.getUser.pending, (state) => {
        state.status.userDetail = 'PENDING';
        state.error = null;
      })
      .addCase(authAsyncAction.getUser.fulfilled, (state, action) => {
        state.status.userDetail = 'SUCCESS';
        state.data.userDetail = action.payload;
        state.error = null;
      })
      .addCase(authAsyncAction.getUser.rejected, (state, action) => {
        state.status.userDetail = 'REJECTED';
        state.data.userDetail = {};
        state.error = action.payload || 'Failed to fetch user data';
      });
  },
});

export const { logout, setStatus } = authSlice.actions;
export default authSlice.reducer;
