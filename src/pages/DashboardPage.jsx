import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAsyncAction } from '../store/authAsyncAction';
import { useTheme } from '@mui/material';
import { NavbarComponent } from '../components/NavbarComponent';
import { WhiteBoxComponent } from '../components/WhiteBoxComponent';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLetter } from '../hooks/useLetter';

export const DashboardPage = () => {
  const theme = useTheme();
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId') || data?.user?.name;
  const nav = useNavigate();
  const { useDashboardLetters } = useLetter();
  const lettersSent = data?.lettersSent ? data?.lettersSent?.length : 0;
  const lettersReceived = data?.lettersReceived ? data?.lettersReceived?.length : 0;
  const recentLetters = data?.lettersReceived[0]?.content;

  useDashboardLetters();

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
      <Box sx={{ padding: 5 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              {/* Welcome Section */}
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Typography variant="h1" sx={{ fontWeight: 950, mb: 1 }}>
                    Welcome, {data?.userDetail?.name}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                </Grid>
                {/* Letters Summary */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <WhiteBoxComponent>
                    <Grid container spacing={2}>
                      {[
                        { label: 'Letters Sent', value: lettersSent, route: '../letters-sent' },
                        {
                          label: 'Letters Received',
                          value: lettersReceived,
                          route: '../letters-received',
                        },
                      ].map((item, idx) => (
                        <Grid
                          key={item.label}
                          size={6}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Typography sx={{ fontWeight: 950 }}>{item.label}</Typography>
                          <Box
                            component={motion.div}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onClick={() => nav(item.route)}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 20,
                              delay: idx * 0.15,
                            }}
                            whileHover={{
                              scale: 1.1,
                              boxShadow: '0 0 24px 4px ' + theme.palette.pink.main,
                            }}
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: '50%',
                              bgcolor: theme.palette.pink.main,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mt: 1,
                              mb: 1,
                              boxShadow: 5,
                              cursor: 'pointer',
                            }}
                          >
                            <Typography variant={'h4'} sx={{ fontWeight: 950, color: '#fff' }}>
                              {item.value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </WhiteBoxComponent>
                </Grid>
                {/* Recent Letters */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <WhiteBoxComponent>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <Typography variant={'h4'} sx={{ fontWeight: 950 }}>
                        💌 Recent Letters from Your Partner:
                      </Typography>
                      <Typography mt={2}>
                        {recentLetters
                          ? recentLetters
                          : 'You have no recent letters from your partner 🥀'}
                      </Typography>
                    </motion.div>
                  </WhiteBoxComponent>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container mt={2}>
                <Grid size={12}>
                  <WhiteBoxComponent>
                    <Typography variant={'h4'} sx={{ fontWeight: 950 }} mb={2}>
                      Letters received:
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      {Array.isArray(data?.lettersReceived) && data.lettersReceived.length > 0 ? (
                        data.lettersReceived.map((letter) => (
                          <Button
                            key={letter.id || letter.title}
                            sx={{ textAlign: 'left', width: '100%' }}
                          >
                            💌 {letter.title}
                          </Button>
                        ))
                      ) : (
                        <Typography color="text.secondary" textAlign="center" mt={2}>
                          You have no received letters yet 🥀
                        </Typography>
                      )}
                      <Typography
                        textAlign="left"
                        mt={2}
                        sx={{
                          cursor: 'pointer',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'text-decoration 0.2s',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        onClick={() => nav('/letters-received')}
                      >
                        See more..
                      </Typography>
                    </Box>
                  </WhiteBoxComponent>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container mt={2}>
                <Grid size={12}>
                  <WhiteBoxComponent>
                    <Typography variant={'h4'} sx={{ fontWeight: 950 }} mb={2}>
                      Letters sent:
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      {Array.isArray(data?.lettersSent) && data.lettersSent.length > 0 ? (
                        data.lettersSent.map((letter) => (
                          <Button
                            key={letter.id || letter.title}
                            sx={{ textAlign: 'left', width: '100%' }}
                          >
                            💌 {letter.title}
                          </Button>
                        ))
                      ) : (
                        <Typography color="text.secondary" textAlign="center" mt={2}>
                          You have no sent letters yet 🥀
                        </Typography>
                      )}
                      <Typography
                        textAlign="left"
                        mt={2}
                        sx={{
                          cursor: 'pointer',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'text-decoration 0.2s',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        onClick={() => nav('/letters-sent')}
                      >
                        See more..
                      </Typography>
                    </Box>
                  </WhiteBoxComponent>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                position: { md: 'fixed', xs: 'static' },
                top: { md: 100, xs: 'auto' },
                right: { md: 40, xs: 'auto' },
                zIndex: 1200,
                width: { md: 350, xs: '100%' },
                maxWidth: '90vw',
                boxShadow: 8,
                borderRadius: 5,
                background: theme.palette.background.default,
              }}
            >
              <WhiteBoxComponent>
                <Typography variant={'h4'} sx={{ fontWeight: 950 }}>
                  🎂 Anniversary & Birthday Reminders
                </Typography>
                <img
                  src="/dashboard.png"
                  alt="Anniversary & Birthday Reminders"
                  style={{ width: '80%', height: 'auto' }}
                />
                <Grid container>
                  <Grid size={6}>
                    <Typography mt={2}>{data?.userDetail?.name}</Typography>
                    <Typography>56 days left</Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography mt={2}>
                      {data?.partnerDetail?.name
                        ? data?.partnerDetail?.name
                        : 'No partner found ☹️'}
                    </Typography>
                    <Typography>{data?.partnerDetail ? '20' : '0'} days left</Typography>
                  </Grid>
                </Grid>
              </WhiteBoxComponent>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 1300,
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <IconButton
            sx={{
              bgcolor: theme.palette.accent.main,
              color: theme.palette.accent.contrastText,
              transition: 'background 0.2s',
              '&:hover': {
                bgcolor: theme.palette.pink.main,
              },
              boxShadow: 10,
            }}
            onClick={() => nav('/create-letter')}
            onMouseEnter={(e) => {
              const label = e.currentTarget.nextSibling;
              if (label) label.style.opacity = 1;
            }}
            onMouseLeave={(e) => {
              const label = e.currentTarget.nextSibling;
              if (label) label.style.opacity = 0;
            }}
          >
            <Edit />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              left: '110%',
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              px: 2,
              py: 0.5,
              borderRadius: 2,
              boxShadow: 3,
              fontWeight: 600,
              fontSize: 16,
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            Write letters
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
