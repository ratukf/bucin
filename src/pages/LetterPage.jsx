import { Box, Grid, Typography, Divider, IconButton, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useLetter as useLetterHook } from '../hooks/useLetter';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';

export const LetterPage = () => {
  const theme = useTheme();
  const nav = useNavigate();
  const { id } = useParams();
  const { useLetter } = useLetterHook();
  const { data } = useSelector((state) => state.auth);

  useLetter(id);

  const letter = data?.letter;
  const sender = data?.userDetail?.name || '-';
  const recipient = data?.partnerDetail?.name || '-';

  return (
    <Box
      minHeight="100vh"
      width="100%"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `radial-gradient(circle, #fff 0%, #fff 40%, ${theme.palette.pink.main} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
        <IconButton
          onClick={() => nav(-1)}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
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
        <Typography
          variant="h5"
          fontWeight={700}
          color={theme.palette.primary.main}
          textAlign="center"
          mb={2}
          sx={{ mt: 2 }}
        >
          {letter?.title || 'No Title'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography
          variant="body1"
          color={theme.palette.text.primary}
          sx={{ whiteSpace: 'pre-line', mb: 2 }}
        >
          {letter?.content || 'No Content'}
        </Typography>
        <Box mt={2}>
          <Typography variant="caption" color={theme.palette.text.secondary}>
            <strong>Date:</strong> {letter?.date ? dayjs(letter.date).format('DD MMM YYYY HH:mm') : '-'}
          </Typography>
        </Box>
        <Box mt={1} display="flex" justifyContent="space-between">
          <Typography variant="caption" color={theme.palette.text.secondary}>
            <strong>Sender:</strong> {sender}
          </Typography>
          <Typography variant="caption" color={theme.palette.text.secondary}>
            <strong>Recipient:</strong> {recipient}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
