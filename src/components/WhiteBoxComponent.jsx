import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';

export const WhiteBoxComponent = ({ children, sx = {}, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        borderRadius: 5,
        p: 2,
        textAlign: 'center',
        color: theme.palette.text.primary,
        boxShadow: 5,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
