import { NavbarComponent } from '../components/NavbarComponent';
import { BlinkParticlesComponent } from '../components/BlinkParticlesComponent';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const theme = useTheme();
  const nav = useNavigate();
  return (
    <Box
      minHeight="100vh"
      width="100%"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.pink.main} 100%)`,
      }}
    >
      <BlinkParticlesComponent />
      <Box sx={{ pt: 2, boxShadow: 5, position: 'relative', zIndex: 1 }}>
        <NavbarComponent />
      </Box>
      <Box>
        <Grid container sx={{ alignItems: 'center', height: '80vh', px: 2 }}>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ color: theme.palette.primary.contrastText, order: { xs: 2, md: 1 } }}
          >
            <Typography variant="h2" mb={2}>
              Keep Love in Words
            </Typography>
            <Typography mb={2} sx={{ color: theme.palette.secondary.contrastText }}>
              Keep Love in Words is your pocket diary for sweet messages, surprise notes, and
              memories that stay forever.
            </Typography>
            <Button
              onClick={() => nav('/login')}
              sx={{
                bgcolor: theme.palette.accent.main,
                color: theme.palette.accent.contrastText,
                boxShadow: 5,
              }}
            >
              Start Writing Messages
            </Button>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            display={{ xs: 'none', md: 'block' }}
            sx={{ order: { xs: 1, md: 2 }, textAlign: 'right' }}
          >
            <img
              src="/hero.png"
              alt="Couple"
              style={{ width: 'auto', height: '80vh', maxWidth: '100%' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
