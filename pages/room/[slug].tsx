/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadRoom, loadRooms } from '@/lib/db';
import { GetStaticProps } from 'next';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async (context) => {
  const roomSlug = context.params?.slug as string;
  const { _id, ...room } = await loadRoom(roomSlug);
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

const Room = ({ room }: { room: RoomProps }) => {
  if (!room) return null;

  return (
    <>
      <Link href="/">
        <HomeIcon color="inherit" aria-label="menu" sx={{ mr: 2 }} style={{ margin: '15px' }} />
      </Link>
      {room._id}
      <br />
      {room.name}
      <br />
      {room.slug}
    </>
  );
};

export default Room;
