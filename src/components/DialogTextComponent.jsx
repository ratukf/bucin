import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

export const DialogTextComponent = ({
  open,
  onClose,
  title,
  label,
  buttonLabel,
  onClick,
  value,
  onChange,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ padding: 2, borderRadius: 5, boxShadow: 2 }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>{title}</DialogTitle>
      <DialogContent>
        <TextField
          label={label}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          maxRows={30}
          value={value}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={!value} variant="contained" onClick={onClick} sx={{ margin: 1 }}>
          {buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
