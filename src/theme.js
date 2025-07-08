import { createTheme } from '@mui/material/styles';

// Custom color palette
const palette = {
  primary: {
    main: '#8e44ad', // purple
    contrastText: '#fff',
  },
  secondary: {
    main: '#f7cac9', // soft pink
    contrastText: '#333333',
  },
  accent: {
    main: '#5e3370', // deep purple
    contrastText: '#fff',
  },
  lavender: {
    main: '#e6e6fa', // lavender
    contrastText: '#333333',
  },
  pink: {
    main: '#f194b4', // light pink
    contrastText: '#333333',
  },
  background: {
    default: '#fdf6f9', // very light pink
    paper: '#fff',
  },
  text: {
    primary: '#333333',
    secondary: '#5e3370',
  },
};

const mainFont = [
  'Poppins',
  'Quicksand',
  'system-ui',
  'Avenir',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(',');
const headingFont = 'Poppins, Quicksand, sans-serif';
const quicksandFont = 'Quicksand, Poppins, sans-serif';

const theme = createTheme({
  palette: {
    ...palette,
  },
  typography: {
    fontFamily: mainFont,
    h1: {
      fontFamily: headingFont,
      fontWeight: 700,
      fontSize: '2.8rem',
      letterSpacing: '-1px',
    },
    h2: {
      fontFamily: headingFont,
      fontWeight: 600,
      fontSize: '2.2rem',
      letterSpacing: '-0.5px',
    },
    h3: { fontFamily: headingFont, fontWeight: 600, fontSize: '1.7rem' },
    h4: { fontFamily: quicksandFont, fontWeight: 500, fontSize: '1.3rem' },
    h5: { fontFamily: quicksandFont, fontWeight: 500, fontSize: '1.1rem' },
    h6: { fontFamily: quicksandFont, fontWeight: 500, fontSize: '1rem' },
    body1: { fontFamily: quicksandFont, fontWeight: 400, fontSize: '1rem' },
    body2: { fontFamily: quicksandFont, fontWeight: 400, fontSize: '0.95rem' },
    button: {
      fontFamily: headingFont,
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.5px',
    },
    subtitle1: { fontFamily: quicksandFont, fontWeight: 500, fontSize: '1rem' },
    subtitle2: {
      fontFamily: quicksandFont,
      fontWeight: 500,
      fontSize: '0.9rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
          transition: 'background 0.2s, color 0.2s',
          '&:hover': {
            backgroundColor: palette.primary.main,
            color: '#fff',
            boxShadow: '0 4px 16px 0 rgba(142,68,173,0.12)',
          },
        },
      },
    },
  },
});

export default theme;
