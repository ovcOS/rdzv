/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadRoom, loadRooms } from '@/lib/db';
import { GetStaticProps } from 'next';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Container } from '@mui/material';
import { Map } from '@/components';
import { useEffect, useState } from 'react';
import { getParticipantId } from '@/lib/web';
import { HeaderCard } from './HeaderCard';
import { ParticipantForm } from './ParticipantForm';

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

const MapCard = ({ room }: { room: RoomProps }) => {
  const existingOrigins = room.participants.map((v) => v.location);
  return (
    <Card>
      <CardContent>
        <Map existingOrigins={existingOrigins} />
      </CardContent>
    </Card>
  );
};

const Room = ({ room }: { room: RoomProps }) => {
  const [participantId, setParticipantId] = useState('');

  useEffect(() => {
    setParticipantId(getParticipantId());
  }, []);

  if (!room) return null;

  const hasParticipant = room.participants.find((v) => v.id === participantId);

  return (
    <Container maxWidth="md" style={{ marginBottom: '20px' }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <HeaderCard room={room} participantId={participantId} />
        </Grid>
      </Grid>
      {!hasParticipant && (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <ParticipantForm room={room} participantId={participantId} />
          </Grid>
        </Grid>
      )}
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <MapCard room={room} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Room;
