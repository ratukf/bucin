import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { letterAsyncAction } from '../store/letterAsyncAction';
import { authAsyncAction } from '../store/authAsyncAction';
import { useState, useEffect } from 'react';

export function useLetter() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user, data } = useSelector((state) => state.auth);
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

  const useDashboardLetters = () => {
    useEffect(() => {
      const userId = localStorage.getItem('userId');
      const recipient = data?.userDetail?.couple_id;
      if (userId) {
        dispatch(authAsyncAction.getUser(userId));
        dispatch(letterAsyncAction.getLettersSent(userId));
      }
      if (recipient) {
        dispatch(letterAsyncAction.getLettersReceived(recipient));
        dispatch(authAsyncAction.getPartner(recipient));
      }
    }, [dispatch, data?.userDetail?.couple_id]);
  };

  const useLettersReceived = () => {
    useEffect(() => {
      const userId = localStorage.getItem('userId');
      const recipient = data?.userDetail?.couple_id;
      if (userId) {
        dispatch(authAsyncAction.getUser(userId));
      }
      if (recipient) {
        dispatch(letterAsyncAction.getLettersReceived(recipient));
        dispatch(authAsyncAction.getPartner(recipient));
      }
    }, [dispatch, data?.userDetail?.couple_id]);
  };

  const useLettersSent = () => {
    useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        dispatch(letterAsyncAction.getLettersSent(userId));
      }
    }, [dispatch]);
  };

  return {
    theme,
    handleCreateLetter,
    successMsg,
    errorMsg,
    useDashboardLetters,
    useLettersReceived,
    useLettersSent,
  };
}
