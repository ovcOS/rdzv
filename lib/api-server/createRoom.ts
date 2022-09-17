import { ObjectId } from 'mongodb';
import { insertRoom, loadRoom } from '../db';
import { TransportationMode } from './constants';
import { getSlug } from './helpers';

const getDefaults = () => ({
  _id: new ObjectId(),
  name: '',
  slug: '',
  participants: [],
  transportationMode: TransportationMode.Public,
  location: null,
});

export const createRoom = async (name: string) => {
  const slug = getSlug(name);
  const existingRoom = await loadRoom(slug);
  if (existingRoom) return;

  const newRoom: RoomProps = {
    ...getDefaults(),
    name,
    slug: getSlug(name),
  };
  await insertRoom(newRoom);
};