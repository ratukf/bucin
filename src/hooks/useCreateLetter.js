import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { letterAsyncAction } from '../store/letterAsyncAction';
import { useState } from 'react';

export function useCreateLetter() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateLetter = async (values, { resetForm, setSubmitting }) => {
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const payload = {
        ...values,
        user_id: user?.id || localStorage.getItem('userId'),
        recipient_id: user?.couple_id,
        date: new Date().toISOString(),
        isRead: false,
      };
      await dispatch(letterAsyncAction.createLetter(payload)).unwrap();
      setSuccessMsg('Yeay, letter has been sent! 😄');
      resetForm();
      setTimeout(() => {
        nav('/dashboard');
      }, 1000);
    } catch (err) {
      setErrorMsg(err?.message || 'Oops! Letter cannot be sent ☹️');
    } finally {
      setSubmitting(false);
    }
  };

  return { theme, handleCreateLetter, successMsg, errorMsg };
}