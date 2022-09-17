import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

// TODO: extract consts
type Position = { lat: number; lng: number };
const DEFAULT_POSITION = { lat: 1, lng: 1 };
const RDZV = 'rdzv';

const handleEnterExistingRoom = (roomCode: string, userName: string, position: Position) => {
  const localStorageId = `${RDZV}_${roomCode}`;
  const localStorageItem = localStorage.getItem(localStorageId);
  if (!localStorageItem) localStorage.setItem(localStorageId, JSON.stringify({ userName, position }));

  const localStorageContent = localStorageItem ? JSON.parse(localStorageItem) : undefined;
  const { userName: lastUserName = '', position: lastPosition = DEFAULT_POSITION } = localStorageContent;
  console.log({ roomCode, lastPosition, lastUserName });
};

export const ExistingRoomSettings = () => {
  const [roomCode, setRoomCode] = useState('testCode');
  const hasRoomCode = !!roomCode;
  const userName = 'testUserName';
  const position = DEFAULT_POSITION;

  return (
    <>
      <Grid item xs={7} style={{ textAlign: 'center' }}>
        <TextField
          id="standard-basic"
          label="Enter your room code"
          variant="standard"
          focused
          onChange={(input) => setRoomCode(input.target.value)}
        />
      </Grid>
      <Grid item xs={5} style={{ textAlign: 'center' }}>
        <Button
          variant="outlined"
          href={`room/${roomCode}`}
          disabled={!hasRoomCode}
          onClick={() => handleEnterExistingRoom(roomCode, userName, position)}
        >
          Continue
        </Button>
      </Grid>
    </>
  );
};
