import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NavbarComponent } from '../components/NavbarComponent';
import { Formik, Form, Field } from 'formik';
import { useCreateLetter } from '../hooks/useCreateLetter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authAsyncAction } from '../store/authAsyncAction';

export const CreateLetterPage = () => {
const { theme, handleCreateLetter, successMsg, errorMsg } = useCreateLetter();
const dispatch = useDispatch();

useEffect(() => {
  dispatch(authAsyncAction.getUser(localStorage.getItem('userId')));
}, [dispatch])

  return (
    <Box
      minHeight="100vh"
      width="100%"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `radial-gradient(circle, #fff 0%, #fff 40%, ${theme.palette.pink.main} 100%)`,
      }}
    >
      <Box sx={{ boxShadow: 5 }}>
        <NavbarComponent />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        sx={{ position: 'relative' }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(50% - 300px)',
            left: { xs: 'calc(50% - 250px)', md: 'calc(50% - 375px)' },
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <img src="/flower.png" alt="Flower" style={{ width: 175, height: 175 }} />
        </Box>

        <Paper
          sx={{
            width: { xs: 400, md: 600 },
            minHeight: 320,
            p: 4,
            borderRadius: 5,
            border: `2px solid ${theme.palette.pink.main}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: {xs: 0, md: -100},
              bottom: -100,
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <img src="/cat.png" alt="Cat" style={{ width: 100, height: 'auto' }} />
          </Box>
          <Typography variant="h4" fontWeight={950} color={theme.palette.pink.main} align="center">
            Love Letter
          </Typography>
          <Formik
            initialValues={{ title: '', content: '' }}
            onSubmit={handleCreateLetter}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field
                  as={TextField}
                  name="title"
                  variant="outlined"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ maxLength: 50, style: { fontWeight: 'bold' } }}
                  sx={{
                    background: '#fff',
                    borderRadius: 5,
                    boxShadow: 1,
                    fontFamily: 'Quicksand, Poppins, sans-serif',
                  }}
                  InputProps={{
                    style: { fontFamily: 'Quicksand, Poppins, sans-serif', fontWeight: 'bold' },
                  }}
                />
                <Field
                  as={TextField}
                  name="content"
                  multiline
                  rows={8}
                  variant="outlined"
                  placeholder="Write letter here..."
                  value={values.content}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    background: '#fff',
                    borderRadius: 5,
                    boxShadow: 1,
                    fontFamily: 'Quicksand, Poppins, sans-serif',
                  }}
                  InputProps={{
                    style: { fontFamily: 'Quicksand, Poppins, sans-serif' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: theme.palette.pink.main,
                    color: theme.palette.pink.contrastText,
                    fontWeight: 700,
                    borderRadius: 5,
                    boxShadow: 2,
                    '&:hover': {
                      background: theme.palette.pink.dark,
                    },
                  }}
                  disabled={!values.content.trim() ||!values.title.trim() || isSubmitting}
                >
                  Send
                </Button>
                {successMsg && (
                  <Typography color="success.main" mt={2} align="center">
                    {successMsg}
                  </Typography>
                )}
                {errorMsg && (
                  <Typography color="error" mt={2} align="center">
                    {errorMsg}
                  </Typography>
                )}
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
};
