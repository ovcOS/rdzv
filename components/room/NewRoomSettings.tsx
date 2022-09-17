import { createRoom } from '@/lib/api-client';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

export const NewRoomSettings = ({ goBack }: { goBack: () => void }) => {
  const router = useRouter();

  const [roomName, setRoomName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const disabled = !roomName || isLoading;

  const submit = async () => {
    setLoading(true);
    const room = await createRoom(roomName);
    const { slug } = room;
    router.push(`room/${slug}`);
    setLoading(false);
  };

  return (
    <>
      <Grid item xs={7} style={{ textAlign: 'center' }}>
        <TextField
          size="medium"
          id="newRoomName"
          helperText="Enter your meetup name"
          variant="standard"
          focused
          onKeyUp={async (e) => {
            if (e.keyCode === 13) await submit();
          }}
          onChange={(input) => setRoomName(input.target.value)}
        />
      </Grid>
      <Grid item xs={5} style={{ textAlign: 'center' }}>
        <LoadingButton loading={isLoading} size="large" variant="outlined" onClick={submit} disabled={disabled}>
          Continue
        </LoadingButton>{' '}
        or{' '}
        <Link component="button" variant="body2" onClick={() => goBack()}>
          Back
        </Link>
      </Grid>
    </>
  );
};
