import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { hasRoom } from '@/lib/api-client';
import Link from '@mui/material/Link';

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

export const ExistingRoomSettings = ({ goBack }: { goBack: () => void }) => {
  const [slug, setSlug] = useState('');
  const [isSlugValid, setIsSlugValid] = useState<boolean>(true);

  const disabled = !slug || !isSlugValid;
  const router = useRouter();

  return (
    <>
      <Grid item xs={7} style={{ textAlign: 'center' }}>
        <TextField
          error={!isSlugValid}
          size="medium"
          id="standard-basic"
          placeholder="example-code"
          helperText={!isSlugValid ? 'The room code you entered is invalid. 🥲' : 'Enter your meetup code'}
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
          size="large"
          variant="outlined"
          disabled={disabled}
          onClick={async () => {
            await handleEnterExistingRoom({ setIsSlugValid, slug, router });
          }}
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
