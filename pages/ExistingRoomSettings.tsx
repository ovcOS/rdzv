import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const ExistingRoomSettings = () => {
  const [roomCode, setRoomCode] = useState('testCode');
  const hasRoomCode = !!roomCode;
  return (
    <>
      <Grid item xs={7} style={{ textAlign: 'center' }}>
        <TextField
          id="standard-basic"
          label="Enter your room code"
          variant="standard"
          focused
          onChange={(input) => setRoomCode(input.target.value)} />
      </Grid>
      <Grid item xs={5} style={{ textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => undefined} disabled={!hasRoomCode}>
          Continue
        </Button>
      </Grid>
    </>
  );
};
