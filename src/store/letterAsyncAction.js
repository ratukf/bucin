import { createAsyncThunk } from '@reduxjs/toolkit';
import { letterService } from '../services/letterService';

export const letterAsyncAction = {
  getLettersSent: createAsyncThunk('letters/getLettersSent', async (userId) => {
    try {
      const data = await letterService.getLetters(userId);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || 'Failed to fetch letters');
    }
  }),
  getLettersReceived: createAsyncThunk('letters/getLettersReceived', async (recipient) => {
    try {
      const data = await letterService.getLetters(recipient);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || 'Failed to fetch letters');
    }
  }),
  createLetter: createAsyncThunk('letters/createLetter', async (letterData) => {
    try {
      const data = await letterService.createLetter(letterData);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || 'Failed to create letter');
    }
  }),
};
