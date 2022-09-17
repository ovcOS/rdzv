import { Card, CardContent, Typography, Avatar, Paper, Grid } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name: string) => {
  const nameSplits = name.split(' ');
  const isOneStringName = nameSplits.length === 1;
  const firstInitial = name.split(' ')[0][0];
  const secondInitial = isOneStringName ? undefined : name.split(' ')[1][0];
  const initials = isOneStringName ? firstInitial : `${firstInitial}${secondInitial}`;
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};

export const HeaderCard = ({ room, participantId }: { room: RoomProps; participantId: Id }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: '20px' }}>
        Let’s meet: 🏡 {room.name}
      </Typography>
      <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: '20px' }}>
        Who’s coming so far?
      </Typography>
      {room.participants.map((v, i) => {
        const { id, name, location } = v;
        const { lng, lat } = location;
        const isParticipant = id === participantId;
        return (
          <Paper key={i} variant="outlined">
            <Grid container wrap="nowrap" style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar {...stringAvatar(name)} style={{ margin: '8px' }} /> {v.name}
            </Grid>
            <Grid container wrap="nowrap">
              <Grid
                xs={11}
                style={{
                  marginLeft: '15px',
                  marginTop: '5px',
                  marginBottom: '5px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LocationOnIcon /> {lat} {lng}
              </Grid>
              <Grid xs={1}>{isParticipant ? <CheckBoxIcon /> : ''}</Grid>
            </Grid>
          </Paper>
        );
      })}
    </CardContent>
  </Card>
);
