import { Collection } from 'mongodb';
import clientPromise from './client';
import { DB_NAME, COLLECTIONS } from './db';

const getRoomsCollection = async (): Promise<Collection<RoomProps>> => {
  const client = await clientPromise;
  return client.db(DB_NAME).collection<RoomProps>(COLLECTIONS.ROOMS);
};

export const loadRoom = async (name: string): Promise<RoomProps | null> => {
  const collection = await getRoomsCollection();
  const room = await collection.findOne({ name });
  return room;
};

export const insertRoom = async (room: RoomProps): Promise<void> => {
  const collection = await getRoomsCollection();
  collection.insertOne(room);
};
