import clientPromise from './mongodb';
import { DB_NAME, COLLECTIONS } from './db';

export const getRoom = async (name: string): Promise<RoomProps | null> => {
  const client = await clientPromise;
  const collection = client.db(DB_NAME).collection<RoomProps>(COLLECTIONS.ROOMS);
  const room = await collection.findOne({ name });
  return room;
};
