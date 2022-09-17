import { Card, CardContent, Typography, Avatar, Paper, Grid } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';

type ParticipantWithAddressProps = ParticipantProps & { address?: string };

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

const loadAddress = async (geocoder: google.maps.Geocoder, v: ParticipantProps) => {
  try {
    const response = await geocoder.geocode({ location: v.location });
    const address = response.results[0].formatted_address;
    return address;
  } catch (err) {
    return undefined;
  }
};

export const HeaderCard = ({ room, participantId }: { room: RoomProps; participantId: Id }) => {
  const geocoder = new google.maps.Geocoder();
  const [participants, setParticipants] = useState(room.participants as ParticipantWithAddressProps[]);

  useEffect(() => {
    const reviseParticipants = async () => {
      const revisedParticipants = await Promise.all(
        room.participants.map(async (v) => {
          const address = await loadAddress(geocoder, v);
          return { ...v, address } as ParticipantWithAddressProps;
        })
      );
      setParticipants(revisedParticipants);
    };
    reviseParticipants();
  }, [room.participants]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: '20px' }}>
          Let’s meet: <b>{room.name}</b>
        </Typography>
        <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: '20px' }}>
          Who’s coming so far?
        </Typography>
        {participants.map((v, i) => {
          const { id, name, location, address } = v;
          const { lng, lat } = location;
          const isParticipant = id === participantId;
          return (
            <Paper key={i} variant="outlined">
              <Grid container wrap="nowrap" style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar {...stringAvatar(name)} style={{ margin: '8px' }} /> {v.name}
              </Grid>
              <Grid container wrap="nowrap">
                <Grid
                  item
                  xs={11}
                  style={{
                    marginLeft: '15px',
                    marginTop: '5px',
                    marginBottom: '5px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LocationOnIcon /> {address ? address : ''} ({lat}, {lng})
                </Grid>
                <Grid item xs={1}>
                  {isParticipant ? <CheckBoxIcon /> : ''}
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </CardContent>
    </Card>
  );
};
