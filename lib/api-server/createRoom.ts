import { ObjectId } from 'mongodb';
import { insertRoom, loadRoom } from '../db';
import { TravelMode } from './constants';
import { getSlug } from './helpers';

const getDefaults = () => ({
  _id: new ObjectId(),
  name: '',
  slug: '',
  participants: [],
  transportationMode: TravelMode.TRANSIT,
  location: null,
});

export const createRoom = async (name: string) => {
  const slug = getSlug(name);
  const existingRoom = await loadRoom(slug);
  const revisedSlug = existingRoom ? `${slug}0` : slug;

  const newRoom: RoomProps = {
    ...getDefaults(),
    name,
    slug: revisedSlug,
  };
  await insertRoom(newRoom);
  return newRoom;
};
