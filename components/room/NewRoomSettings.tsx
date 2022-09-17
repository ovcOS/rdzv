import { createRoom } from '@/lib/api-client';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const NewRoomSettings = () => {
  const [roomName, setRoomName] = useState('testName');
  const hasRoomName = !!roomName;
  return (
    <>
      <Grid item xs={7} style={{ textAlign: 'center' }}>
        <TextField
          id="newRoomName"
          label="Enter your room name"
          variant="standard"
          focused
          onChange={(input) => setRoomName(input.target.value)}
        />
      </Grid>
      <Grid item xs={5} style={{ textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => createRoom(roomName)} disabled={!hasRoomName}>
          Continue
        </Button>
      </Grid>
    </>
  );
};
