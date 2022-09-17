import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export const ChooseStatus = ({ setStatus }: { setStatus: (arg: Status) => void }) => (
  <>
    <Grid item xs={6} style={{ textAlign: 'center' }}>
      <Button variant="outlined" onClick={() => setStatus('new')}>
        Create new room
      </Button>
    </Grid>
    <Grid item xs={6} style={{ textAlign: 'center' }}>
      <Button variant="outlined" onClick={() => setStatus('existing')}>
        Enter a room
      </Button>
    </Grid>
  </>
);
