import { Box, Grid, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material';
import { NavbarComponent } from '../components/NavbarComponent';
import { useLetter } from '../hooks/useLetter';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export const LettersSentPage = () => {
  const theme = useTheme();
  const { useLettersSent } = useLetter();
  const { data } = useSelector((state) => state.auth);

  useLettersSent();

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
      <Box>
        <Grid container sx={{ padding: 4 }} spacing={2}>
          <Grid size={12}>
            <Typography variant={'h2'}>Letters sent 🛩️ </Typography>
          </Grid>
          <Grid size={12}>
            <Divider sx={{ marginY: 2 }} />
          </Grid>
          {data?.lettersSent && data.lettersSent.length > 0 ? (
            data.lettersSent.map((letter) => (
              <Grid size={{ xs: 6, md: 4 }} key={letter.id}>
                <Box
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    height: '100%',
                    transform: 'scale(1)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: 5,
                      cursor: 'pointer',
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {letter.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {letter.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" mt="auto">
                    {dayjs(letter.date).format('DD MMMM YYYY HH:mm')}
                  </Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center">
                You have no received letters yet 🥀
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
