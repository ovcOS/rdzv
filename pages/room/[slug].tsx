/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadRoom, loadRooms } from '@/lib/db';
import { GetStaticProps } from 'next';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { Map } from '@/components/Map';
import { useEffect, useState } from 'react';
import { getParticipantId } from '@/lib/web';

export const getStaticProps: GetStaticProps = async (context) => {
  const roomSlug = context.params?.slug as string;
  const { _id, ...room } = (await loadRoom(roomSlug)) || {};
  return {
    props: {
      room,
    },
  };
};

export async function getStaticPaths() {
  const rooms = await loadRooms();
  const paths = rooms.map((room) => ({
    params: { slug: room.slug },
  }));
  return { paths, fallback: true };
}

const MapCard = () => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lets meet
      </Typography>
      <Typography variant="body2" color="text.secondary">
        What is your current location?
      </Typography>
      <Map />
    </CardContent>
  </Card>
);

const DetailsCard = ({ room, participantId }: { room: RoomProps; participantId: Id }) => (
  <Card style={{ marginTop: '150px' }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Room: {room.name}
      </Typography>
      Participants
      {room.participants.map((v, index) => {
        const isParticipant = v._id === participantId;
        return (
          <Typography key={index} variant="body2" color="text.secondary">
            {v.name} - {JSON.stringify(v.location)} {isParticipant ? '<-' : ''}
          </Typography>
        );
      })}
    </CardContent>
  </Card>
);

const TakePartCard = ({ room }: { room: RoomProps }) => {
  const [name, setName] = useState('');
  const disabled = !name || name.length <= 3;
  return (
    <Card style={{ marginTop: '50px' }}>
      <CardContent>
        <TextField id="standard-basic" label="Name" variant="standard" onChange={(v) => setName(v.target.value)} />
        <Typography variant="body2" gutterBottom style={{ marginTop: '10px' }}>
          Location: Zürich, Switzerland (detected)
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" disabled={disabled} onClick={() => console.log('add participant', { name })}>
          Take part
        </Button>
      </CardActions>
    </Card>
  );
};

const Room = ({ room }: { room: RoomProps }) => {
  const [participantId, setParticipantId] = useState('');

  useEffect(() => {
    setParticipantId(getParticipantId());
  }, []);

  if (!room) return null;

  const hasParticipant = room.participants.find((v) => v._id === participantId);

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <Link href="/">
            <HomeIcon color="inherit" aria-label="menu" sx={{ mr: 2 }} style={{ margin: '15px' }} />
          </Link>
        </Grid>
        <Grid xs={6}>
          <MapCard />
        </Grid>
        <Grid xs={6}>
          <DetailsCard room={room} participantId={participantId} />
          {!hasParticipant && <TakePartCard room={room} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Room;
