import { ObjectId } from 'mongodb';
import { insertRoomInternal, loadRoom } from '../db';
import { getRandomNumber } from '../utils';
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

  const revisedSlug = existingRoom ? `${slug}-${getRandomNumber()}` : slug;

  const newRoom: RoomProps = {
    ...getDefaults(),
    name,
    slug: revisedSlug,
  };
  await insertRoomInternal(newRoom);
  return newRoom;
};
