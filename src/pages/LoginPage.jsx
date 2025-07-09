import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
} from '@mui/material';
import { BlinkParticlesComponent } from '../components/BlinkParticlesComponent';
import { useTheme, alpha } from '@mui/material/styles';
import { NavbarComponent } from '../components/NavbarComponent';
import { GlassBoxComponent } from '../components/GlassBoxComponent';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const theme = useTheme();
  const nav = useNavigate();

  const { handleAuth, error, user } = useAuth('login');

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
            Login
          </Typography>
          <Formik initialValues={{ email: '', password: '' }} onSubmit={handleAuth}>
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }) => (
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
                      htmlFor="login-email"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Email
                    </InputLabel>
                    <OutlinedInput
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
                    {isSubmitting ? 'Loading...' : 'Log In'}
                  </Button>
                  {error && (
                    <Typography color="error" mt={2}>
                      {error}
                    </Typography>
                  )}
                  {user && (
                    <Typography color="success.main" mt={2}>
                      Login succeed!
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Formik>
          <Grid mt={2}>
            Didn't have an account? <Button onClick={() => nav('../signup')}>Sign Up</Button>
          </Grid>
        </GlassBoxComponent>
      </Box>
    </Box>
  );
};
