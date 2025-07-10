import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Divider,
  Dialog,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarComponent } from '../components/NavbarComponent';
import dayjs from 'dayjs';
import { DialogTextComponent } from '../components/DialogTextComponent';
import { useEffect, useState } from 'react';
import { authAsyncAction } from '../store/authAsyncAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { PartnerProfileComponent } from '../components/PartnerProfileComponent';
import { setStatus } from '../store/slice';

export const ProfilePage = () => {
  const theme = useTheme();
  const { data, status } = useSelector((state) => state.auth);
  const [isPartnerIdDialogOpen, setIsPartnerIdDialogOpen] = useState(false);
  const [isPartnerProfileDialogOpen, setIsPartnerProfileDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [partnerIdInput, setPartnerIdInput] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(authAsyncAction.getUser(localStorage.getItem('userId')));
    console.log('Fetching user data...');
  }, [dispatch]);

  useEffect(() => {
    if (data?.userDetail?.couple_id) {
      dispatch(authAsyncAction.getPartner(data.userDetail.couple_id));
    }
  }, [data?.userDetail?.couple_id, dispatch]);

  useEffect(() => {
    if (status?.partnerDetail === 'SUCCESS' && isPartnerIdDialogOpen) {
      setIsPartnerIdDialogOpen(false);
      setPartnerIdInput('');
      setIsPartnerProfileDialogOpen(true);
      dispatch(setStatus({ type: 'partnerDetail', status: 'IDLE' }));
    }
  }, [status?.partnerDetail, isPartnerIdDialogOpen]);

  useEffect(() => {
    if (status?.connectPartner === 'SUCCESS') {
      setIsSuccessDialogOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, [status?.connectPartner]);

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
          <Grid item xs={12} md={6} display="flex" alignItems="center" mb={1}>
            <IconButton
              onClick={() => nav(-1)}
              sx={{
                mr: 1,
                color: theme.palette.primary.main,
                background: theme.palette.background.default,
                boxShadow: theme.shadows[1],
                '&:hover': {
                  background: theme.palette.primary.light,
                },
              }}
              aria-label="back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant={'h2'}>Profile 🧍 </Typography>
          </Grid>
          <Grid item size={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container sx={{ padding: 4 }} spacing={2} justifyContent={'center'}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                position: 'relative',
                width: { xs: '90%', sm: 500 },
                minHeight: 320,
                p: 4,
                borderRadius: 5,
                background: theme.palette.background.paper,
                boxShadow: theme.shadows[6],
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4" gutterBottom>
                ℹ️ Your Profile
              </Typography>
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Id"
                  value={data?.userDetail?.id || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Name"
                  value={data?.userDetail?.name || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Username"
                  value={data?.userDetail?.username || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={data?.userDetail?.email || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Birthday"
                  value={dayjs(data?.userDetail?.birthday).format('DD MMM YYYY') || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                position: 'relative',
                width: { xs: '90%', sm: 500 },
                minHeight: 320,
                p: 4,
                borderRadius: 5,
                background: theme.palette.background.paper,
                boxShadow: theme.shadows[6],
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4" gutterBottom>
                💏 Partner Profile
              </Typography>
              {data?.userDetail?.couple_id ? (
                <Box mt={2} display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Id"
                    value={data?.partnerDetail?.id || ''}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Name"
                    value={data?.partnerDetail?.name || ''}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Username"
                    value={data?.partnerDetail?.username || ''}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    value={data?.partnerDetail?.email || ''}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Birthday"
                    value={dayjs(data?.partnerDetail?.birthday).format('DD MMM YYYY') || ''}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  sx={{ flex: 1 }}
                >
                  <Typography color="text.secondary" textAlign="center" mt={2}>
                    💤 You have no partner profile yet. Please connect with your partner to view
                    their profile.
                  </Typography>
                  <Box flex={1} />
                  <Button
                    onClick={() => setIsPartnerIdDialogOpen(true)}
                    variant="contained"
                    sx={{ mt: 4, alignSelf: 'stretch' }}
                  >
                    Connect with your partner
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <DialogTextComponent
        buttonLabel={'Search'}
        title={'Connect with your partner'}
        label={"Input your partner's id"}
        open={isPartnerIdDialogOpen}
        onClose={() => setIsPartnerIdDialogOpen(false)}
        value={partnerIdInput}
        onChange={(e) => setPartnerIdInput(e.target.value)}
        onClick={() => dispatch(authAsyncAction.getPartner(partnerIdInput))}
      />
      <PartnerProfileComponent
        open={isPartnerProfileDialogOpen}
        onClose={() => setIsPartnerProfileDialogOpen(false)}
        onClick={() =>
          dispatch(
            authAsyncAction.connectPartner({
              userId: localStorage.getItem('userId'),
              partnerId: data?.partnerDetail?.id,
            })
          )
        }
        data={data?.partnerDetail}
      />
      <Dialog
        open={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, boxShadow: 8, p: 0 },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="flex-end" pt={1} pr={1}>
          <IconButton
            aria-label="close"
            onClick={() => {
              setIsSuccessDialogOpen(false);
              setIsPartnerProfileDialogOpen(false);
              dispatch(setStatus({ type: 'connectPartner', status: 'IDLE' }));
            }}
            size="small"
          >
            <span style={{ fontSize: 22, fontWeight: 'bold' }}>&times;</span>
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          px={4}
          pb={4}
          pt={0}
        >
          <Typography variant="h4" fontWeight={700} color="primary" textAlign="center" mb={2}>
            🎉 Success!
          </Typography>
          <Typography variant="h6" textAlign="center" mb={1}>
            Yeay! Now you are connected with your partner 👩‍❤️‍👨
          </Typography>
        </Box>
      </Dialog>
    </Box>
  );
};
