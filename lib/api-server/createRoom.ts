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

export const createRoom = async (name: string): Promise<RoomProps> => {
  const slug = getSlug(name);
  const existingRoom = await loadRoom(slug);
  const randomNumber = Math.floor(Math.random() * 9999);
  const revisedSlug = existingRoom ? `${slug}-${randomNumber}` : slug;

  const newRoom: RoomProps = {
    ...getDefaults(),
    name,
    slug: revisedSlug,
  };
  await insertRoom(newRoom);
  return newRoom;
};
