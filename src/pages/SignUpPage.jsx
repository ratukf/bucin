import { Box, FormControl, Typography, InputLabel, OutlinedInput, Button } from '@mui/material';
import { BlinkParticlesComponent } from '../components/BlinkParticlesComponent';
import { NavbarComponent } from '../components/NavbarComponent';
import { useTheme, alpha } from '@mui/material/styles';
import { GlassBoxComponent } from '../components/GlassBoxComponent';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { authAsyncAction } from '../store/authAsyncAction';
import { useEffect } from 'react';
import { setStatus } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const isSuccess = status.user.signup === 'SUCCESS';
  const nav = useNavigate();

  const handleSignUp = (values, { setSubmitting }) => {
    dispatch(authAsyncAction.signup(values)).finally(() => setSubmitting(false));
  };

  return (
    <Box
      minHeight="100vh"
      width="100%"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.pink.main} 100%)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BlinkParticlesComponent />
      <Box sx={{ pt: 2, boxShadow: 5, position: 'relative', zIndex: 1 }}>
        <NavbarComponent />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 0,
        }}
      >
        <GlassBoxComponent>
          <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2}>
            Create an Account
          </Typography>
          <Formik
            onSubmit={handleSignUp}
            initialValues={{ name: '', email: '', password: '', username: '' }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }) => {
              useEffect(() => {
                if (isSuccess) {
                  setTimeout(() => {
                    nav('../login');
                    dispatch(
                      setStatus({ type: 'user', status: { ...status.user, signup: 'IDLE' } })
                    );
                    resetForm();
                  }, 1000);
                }
              }, [isSuccess, nav, dispatch, resetForm, status.user]);
              return (
                <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
                  <Box mb={2}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        mb: 1,
                        borderRadius: 2,
                        background: alpha(theme.palette.background.paper, 0.35),
                      }}
                    >
                      <InputLabel
                        htmlFor="signup-name"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Name
                      </InputLabel>
                      <OutlinedInput
                        id="signup-name"
                        name="name"
                        type="text"
                        label="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          color: theme.palette.text.primary,
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.divider,
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                          background: 'transparent',
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box mb={2}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        mb: 1,
                        borderRadius: 2,
                        background: alpha(theme.palette.background.paper, 0.35),
                      }}
                    >
                      <InputLabel htmlFor="username" sx={{ color: theme.palette.text.secondary }}>
                        Username
                      </InputLabel>
                      <OutlinedInput
                        id="username"
                        name="username"
                        type="text"
                        label="username"
                        autoComplete="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          color: theme.palette.text.primary,
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.divider,
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                          background: 'transparent',
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box mb={2}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        mb: 1,
                        borderRadius: 2,
                        background: alpha(theme.palette.background.paper, 0.35),
                      }}
                    >
                      <InputLabel
                        htmlFor="login-email"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Email
                      </InputLabel>
                      <OutlinedInput
                        autoComplete="email"
                        id="login-email"
                        name="email"
                        type="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          color: theme.palette.text.primary,
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.divider,
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                          background: 'transparent',
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box mb={3}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{
                        mb: 1,
                        borderRadius: 2,
                        background: alpha(theme.palette.background.paper, 0.35),
                      }}
                    >
                      <InputLabel
                        htmlFor="login-password"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Password
                      </InputLabel>
                      <OutlinedInput
                        autoComplete="new-password"
                        id="login-password"
                        name="password"
                        type="password"
                        label="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          color: theme.palette.text.primary,
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.divider,
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                          background: 'transparent',
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: 16,
                        py: 1.5,
                        boxShadow: theme.shadows[2],
                        textTransform: 'none',
                      }}
                    >
                      {isSubmitting ? 'Loading...' : 'Sign Up'}
                    </Button>
                    {status.user.signup === 'REJECTED' && error && (
                      <Typography color="error" mt={2}>
                        {error}
                      </Typography>
                    )}
                    {status.user.signup === 'SUCCESS' && (
                      <Typography color="success.main" mt={2}>
                        Signup succeed! Redirecting...
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            }}
          </Formik>
        </GlassBoxComponent>
      </Box>
    </Box>
  );
};
