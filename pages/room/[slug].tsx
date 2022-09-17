/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadRoom, loadRooms } from '@/lib/db';
import { GetStaticProps } from 'next';
import Grid from '@mui/material/Grid';
import { Button, Card, CardActions, CardContent, Container, Paper, TextField, Typography } from '@mui/material';
import { Map } from '@/components';
import { useEffect, useState } from 'react';
import { getParticipantId } from '@/lib/web';
import { joinRoom } from '@/lib/api-client';
import { DetailsCard } from './DetailsCard';

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

const MapCard = ({ room, participantId }: { room: RoomProps; participantId: Id }) => {
  const existingOrigins = room.participants.map((v) => v.location);
  const hasParticipant = room.participants.find((v) => v.id === participantId);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lets meet
        </Typography>
        {!hasParticipant && <TakePartContent room={room} participantId={participantId} />}
        <Map existingOrigins={existingOrigins} />
      </CardContent>
    </Card>
  );
};

const TakePartContent = ({ room, participantId }: { room: RoomProps; participantId: Id }) => {
  const [name, setName] = useState('');
  const disabled = !name || name.length <= 3;
  return (
    <>
      <TextField id="standard-basic" label="Name" variant="standard" onChange={(v) => setName(v.target.value)} />
      <Typography variant="body2" gutterBottom style={{ marginTop: '10px' }}>
        Location: Zürich, Switzerland (detected)
      </Typography>
      <Button
        size="medium"
        disabled={disabled}
        onClick={async () => {
          const participant = { id: participantId, name, location: { lat: 1.234, lng: 2.345 } };
          await joinRoom({ slug: room.slug, participant });
          window.location.reload();
        }}
      >
        Take part
      </Button>
    </>
  );
};

const Room = ({ room }: { room: RoomProps }) => {
  const [participantId, setParticipantId] = useState('');

  useEffect(() => {
    setParticipantId(getParticipantId());
  }, []);

  if (!room) return null;

  return (
    <Container maxWidth="md">
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}></Grid>
        <Grid xs={6}>
          <MapCard room={room} participantId={participantId} />
        </Grid>
        <Grid xs={6}>
          <DetailsCard room={room} participantId={participantId} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Room;
