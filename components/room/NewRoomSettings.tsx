import { createRoom } from '@/lib/api-client';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const NewRoomSettings = ({ goBack }: { goBack: () => void }) => {
  const router = useRouter();

  const [roomName, setRoomName] = useState('');
  const hasRoomName = !!roomName;
  return (
    <>
      <Grid item xs={7} style={{ textAlign: 'center' }}>
        <TextField
          size="medium"
          id="newRoomName"
          helperText="Enter your meetup name"
          variant="standard"
          focused
          onChange={(input) => setRoomName(input.target.value)}
        />
      </Grid>
      <Grid item xs={5} style={{ textAlign: 'center' }}>
        <Button
          size="large"
          variant="outlined"
          onClick={async () => {
            const room = await createRoom(roomName);
            const { slug } = room;
            router.push(`room/${slug}`);
          }}
          disabled={!hasRoomName}
        >
          Continue
        </Button>{' '}
        or{' '}
        <Link component="button" variant="body2" onClick={() => goBack()}>
          Back
        </Link>
      </Grid>
    </>
  );
};
