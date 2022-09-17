import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';

export const Notification = ({
  open,
  handleClose,
  message,
}: {
  open: boolean;
  handleClose: () => void;
  message: string;
}) => (
  <Snackbar
    open={open}
    autoHideDuration={3600}
    onClose={handleClose}
    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
  >
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);
