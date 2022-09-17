import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { hasRoom } from '@/lib/api-client';

const handleEnterExistingRoom = async ({
  setIsSlugValid,
  slug,
  router,
}: {
  setIsSlugValid: (arg: boolean) => void;
  slug: string;
  router: NextRouter;
}) => {
  const isSlugValid = await hasRoom(slug);

  setIsSlugValid(isSlugValid);
  if (!isSlugValid) return;

  router.push(`room/${slug}`);
};

export const ExistingRoomSettings = () => {
  const [slug, setSlug] = useState('testCode');
  const hasSlug = !!slug;
  const router = useRouter();

  const [isSlugValid, setIsSlugValid] = useState<boolean>(true);

  return (
    <>
      <Grid item xs={7} style={{ textAlign: 'center' }}>
        <TextField
          id="standard-basic"
          helperText="Enter your room code"
          variant="standard"
          focused
          onChange={(input) => {
            setSlug(input.target.value);
            setIsSlugValid(true);
          }}
        />
      </Grid>
      <Grid item xs={5} style={{ textAlign: 'center' }}>
        <Button
          variant={'outlined'}
          disabled={!hasSlug || !isSlugValid}
          onClick={async () => {
            await handleEnterExistingRoom({ setIsSlugValid, slug, router });
          }}
        >
          Continue
        </Button>
      </Grid>
      {!isSlugValid && (
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
          <Box component="small" sx={{ display: 'inline', color: 'red' }}>
            The room code you entered is invalid. 🥲
          </Box>
        </Grid>
      )}
    </>
  );
};
