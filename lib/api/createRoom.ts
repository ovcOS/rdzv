import { ObjectId } from 'mongodb';
import { insertRoom } from '../db';
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
  const newRoom: RoomProps = {
    ...getDefaults(),
    name,
    slug: getSlug(name),
  };
  await insertRoom(newRoom);
};
