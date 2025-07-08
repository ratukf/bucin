import { Box } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

export const GlassBoxComponent = ({ children, sx = {}, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backdropFilter: 'blur(16px)',
        background: alpha(theme.palette.background.paper, 0.15),
        borderRadius: 4,
        boxShadow: theme.shadows[8],
        border: `1.5px solid ${theme.palette.divider}`,
        p: { xs: 3, sm: 5 },
        minWidth: { xs: '90vw', sm: 400 },
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
