import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

export const PartnerProfileComponent = ({ open, onClose, onClick, data, isSubmitting }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ padding: 2, borderRadius: 5, boxShadow: 2 }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Partner Profile Found
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Id"
          value={data.id || ''}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Name"
          value={data.name || ''}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Username"
          value={data.username || ''}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          value={data.email || ''}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Birthday"
          value={data.birthday || ''}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} variant="outlined" onClick={onClose} sx={{ margin: 1 }}>
          Cancel
        </Button>
        <Button disabled={isSubmitting} variant="contained" onClick={onClick} sx={{ margin: 1 }}>
          Connect 💞
        </Button>
      </DialogActions>
    </Dialog>
  );
};
