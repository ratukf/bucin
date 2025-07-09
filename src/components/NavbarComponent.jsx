import { AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slice';

export const NavbarComponent = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const navItems = userId
    ? [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Your Profile', path: '/anniversary' },
        { label: 'Letters Received', path: '/letters-received' },
        { label: 'Letters Sent', path: '/letters-sent' },
        { label: 'Log Out', path: '/logout', isLogout: true },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'Log In', path: '/login' },
      ];
  return (
    <>
      <Divider sx={{ color: theme.palette.text.primary }} />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: userId ? theme.palette.accent.main : theme.palette.background.default,
          color: theme.palette.text.primary,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <img src="/icon.svg" alt="Bucin Icon" style={{ height: 32, marginRight: 8 }} />
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 700,
                color: userId ? theme.palette.accent.contrastText : theme.palette.text.primary,
              }}
            >
              {userId ? 'Dashboard' : 'BUCIN'}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navItems.map((item, idx) => (
              <>
                <Button
                  key={item.path}
                  onClick={() => {
                    if (item.isLogout) {
                      dispatch(logout());
                      localStorage.removeItem('userId');
                      navigate('/');
                    } else {
                      navigate(item.path);
                    }
                  }}
                  sx={{
                    fontWeight: location.pathname === item.path ? 700 : 200,
                    color: userId ? theme.palette.accent.contrastText : theme.palette.text.primary,
                    borderRadius: 10,
                    transition: 'all 0.2s',
                  }}
                >
                  {item.label}
                </Button>
                {idx < navItems.length - 1 && (
                  <Typography
                    key={item.label + '-sep'}
                    variant="body2"
                    sx={{
                      mx: 0.5,
                      color: userId
                        ? theme.palette.accent.contrastText
                        : theme.palette.text.primary,
                    }}
                  >
                    |
                  </Typography>
                )}
              </>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Divider sx={{ color: theme.palette.text.primary }} />
    </>
  );
};
