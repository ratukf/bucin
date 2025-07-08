import { AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavbarComponent = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'INFORMATION', path: '/information' },
    { label: 'LOG IN', path: '/login' },
  ];
  return (
    <>
      <Divider sx={{ color: theme.palette.text.primary }} />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.default,
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
              sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            >
              BUCIN
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navItems.map((item, idx) => (
              <>
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    fontWeight: location.pathname === item.path ? 700 : 200,
                    color:
                      location.pathname === item.path
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
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
                    sx={{ mx: 0.5, color: theme.palette.text.primary }}
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
