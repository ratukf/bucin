import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { authAsyncAction } from '../store/authAsyncAction';
import { setStatus } from '../store/slice';

export function useAuth(type, resetForm) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { status, user, error } = useSelector((state) => state.auth);

  const isSuccess =
    type === 'login'
      ? status.user.login === 'SUCCESS'
      : status.user.signup === 'SUCCESS';

  const handleAuth = (values, { setSubmitting }) => {
    if (type === 'login') {
      dispatch(authAsyncAction.login(values)).finally(() => setSubmitting(false));
    } else {
      dispatch(authAsyncAction.signup(values)).finally(() => setSubmitting(false));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        if (type === 'login' && user && user.id) {
          localStorage.setItem('userId', user.id);
          nav('../dashboard');
          dispatch(
            setStatus({ type: 'user', status: { ...status.user, login: 'IDLE' } })
          );
        }
        if (type === 'signup') {
          nav('../login');
          dispatch(
            setStatus({ type: 'user', status: { ...status.user, signup: 'IDLE' } })
          );
        }
        resetForm && resetForm();
      }, 1000);
    }
  }, [isSuccess, nav, dispatch, resetForm, status.user, user, type]);

  return { theme, handleAuth, status, user, error, isSuccess };
}