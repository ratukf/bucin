import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
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
        { label: 'Your Profile', path: '/profile' },
        { label: 'Letters Received', path: '/letters-received' },
        { label: 'Letters Sent', path: '/letters-sent' },
        { label: 'Log Out', path: '/logout', isLogout: true },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'Log In', path: '/login' },
      ];
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavClick = (item) => {
    if (item.isLogout) {
      dispatch(logout());
      localStorage.removeItem('userId');
      navigate('/');
    } else {
      navigate(item.path);
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.paper,
        p: 0,
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: theme.palette.accent?.main || theme.palette.primary.main,
        }}
      >
        <img src="/icon.svg" alt="Bucin Icon" style={{ height: 32, marginRight: 8 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.accent?.contrastText || theme.palette.primary.contrastText,
            letterSpacing: 2,
          }}
        >
          BUCIN
        </Typography>
      </Box>
      <List sx={{ flex: 1, p: 0 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(item)}
              sx={{
                py: 2,
                px: 3,
                borderRadius: 0,
                background:
                  location.pathname === item.path
                    ? theme.palette.accent?.light || theme.palette.primary.light
                    : 'transparent',
                color:
                  location.pathname === item.path
                    ? theme.palette.accent?.contrastText || theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                fontWeight: location.pathname === item.path ? 700 : 400,
                fontSize: '1.1rem',
                transition: 'background 0.2s',
                '&:hover': {
                  background: theme.palette.accent?.light || theme.palette.primary.light,
                  color: theme.palette.accent?.contrastText || theme.palette.primary.contrastText,
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  fontSize: '1.1rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Bucin
        </Typography>
      </Box>
    </Box>
  );

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
              onClick={() => navigate('/')}
              variant="h4"
              component="div"
              sx={{
                cursor: 'pointer',
                fontWeight: 700,
                color: userId ? theme.palette.accent.contrastText : theme.palette.text.primary,
              }}
            >
              {'BUCIN'}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item, idx) => (
              <>
                <Button
                  key={item.path}
                  onClick={() => handleNavClick(item)}
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
          {/* Mobile nav */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
            background: theme.palette.background.default,
            boxShadow: 8,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Divider sx={{ color: theme.palette.text.primary }} />
    </>
  );
};
