import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export const ChooseStatus = ({ setStatus }: { setStatus: (arg: HomePageStatus) => void }) => (
  <>
    <Grid item xs={12} lg={6} style={{ textAlign: 'center', marginTop: '10px' }}>
      <Button variant="outlined" onClick={() => setStatus('newRoom')}>
        Create new room
      </Button>
    </Grid>
    <Grid item xs={12} lg={6} style={{ textAlign: 'center', marginTop: '10px' }}>
      <Button variant="outlined" onClick={() => setStatus('existingRoom')}>
        Enter a room
      </Button>
    </Grid>
  </>
);
