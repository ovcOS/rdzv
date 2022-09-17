/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadRoom, loadRooms } from '@/lib/db';
import { GetStaticProps } from 'next';

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
  return (
    <>
      {room._id}
      <br />
      {room.name}
      <br />
      {room.slug}
    </>
  );
};

export default Room;
