/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadRoom, loadRooms } from '@/lib/db';
import { GetStaticProps } from 'next';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography } from '@mui/material';
import { Map } from '@/components/Map';

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

const DetailsCard = ({ room }: { room: RoomProps }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {room.name}
      </Typography>
      Participants
      {room.participants.map((v, index) => (
        <Typography key={index} variant="body2" color="text.secondary">
          {v.name} - {JSON.stringify(v.location)}
        </Typography>
      ))}
    </CardContent>
  </Card>
);

const Room = ({ room }: { room: RoomProps }) => {
  if (!room) return null;

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
          <DetailsCard room={room} />
        </Grid>
      </Grid>
    </>
  );
};

export default Room;
