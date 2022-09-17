import { createRoom } from '@/lib/api-client';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const NewRoomSettings = () => {
  const router = useRouter();

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
        <Button
          variant="outlined"
          onClick={async () => {
            const room = await createRoom(roomName);
            const { slug } = room;
            router.push(`room/${slug}`);
          }}
          disabled={!hasRoomName}
        >
          Continue
        </Button>
      </Grid>
    </>
  );
};
