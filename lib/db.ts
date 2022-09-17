import clientPromise from './mongodb';

if (!process.env.DB_NAME) {
  throw new Error('Please add your Mongo DB_NAME to .env.local');
}

const DB_NAME = process.env.DB_NAME as string;

const COLLECTIONS = Object.freeze({
  ROOMS: 'rooms',
});

export const getRoom = async (name: string): Promise<RoomProps | null> => {
  const client = await clientPromise;
  const collection = client.db(DB_NAME).collection<RoomProps>(COLLECTIONS.ROOMS);
  const room = await collection.findOne({ name });
  return room;
};
