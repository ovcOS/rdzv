import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export const ChooseStatus = ({ setStatus }: { setStatus: (arg: HomePageStatus) => void }) => (
  <>
    <Grid item xs={12} lg={6} style={{ textAlign: 'center', marginTop: '10px' }}>
      <Button size="large" variant="outlined" onClick={() => setStatus('newRoom')}>
        Create a meetup
      </Button>
    </Grid>
    <Grid item xs={12} lg={6} style={{ textAlign: 'center', marginTop: '10px' }}>
      <Button size="large" variant="outlined" onClick={() => setStatus('existingRoom')}>
        Join a meetup
      </Button>
    </Grid>
  </>
);
