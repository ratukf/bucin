import { createSlice } from '@reduxjs/toolkit';
import { authAsyncAction } from './authAsyncAction';
import { letterAsyncAction } from './letterAsyncAction';

const initialState = {
  data: {
    user: [],
    userDetail: {},
    lettersSent: [],
    lettersReceived: [],
    lettersDetail: {},
  },
  status: {
    user: {
      login: 'IDLE',
      signup: 'IDLE',
    },
    userDetail: 'IDLE',
    lettersSent: 'IDLE',
    lettersReceived: 'IDLE',
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

const slice = createSlice({
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
      })
      .addCase(letterAsyncAction.getLettersSent.pending, (state) => {
        state.status.lettersSent = 'PENDING';
        state.error = null;
      })
      .addCase(letterAsyncAction.getLettersSent.fulfilled, (state, action) => {
        state.status.lettersSent = 'SUCCESS';
        state.data.lettersSent = action.payload;
        state.error = null;
      })
      .addCase(letterAsyncAction.getLettersSent.rejected, (state, action) => {
        state.status.lettersSent = 'REJECTED';
        state.data.lettersSent = [];
        state.error = action.payload || 'Failed to fetch letters data';
      })
      .addCase(letterAsyncAction.getLettersReceived.pending, (state) => {
        state.status.lettersReceived = 'PENDING';
        state.error = null;
      })
      .addCase(letterAsyncAction.getLettersReceived.fulfilled, (state, action) => {
        state.status.lettersReceived = 'SUCCESS';
        state.data.lettersReceived = action.payload;
        state.error = null;
      })
      .addCase(letterAsyncAction.getLettersReceived.rejected, (state, action) => {
        state.status.lettersReceived = 'REJECTED';
        state.data.lettersReceived = [];
        state.error = action.payload || 'Failed to fetch letters data';
      })
      .addCase(letterAsyncAction.createLetter.pending, (state) => {
        state.status.letters.create = 'PENDING';
        state.error = null;
      })
      .addCase(letterAsyncAction.createLetter.fulfilled, (state) => {
        state.status.letters.create = 'SUCCESS';
        state.error = null;
      })
      .addCase(letterAsyncAction.createLetter.rejected, (state, action) => {
        state.status.letters.create = 'REJECTED';
        state.error = action.payload || 'Failed to create letter';
      });
  },
});

export const { logout, setStatus } = slice.actions;
export default slice.reducer;
