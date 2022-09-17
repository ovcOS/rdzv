import { Collection } from 'mongodb';
import clientPromise from './client';
import { DB_NAME, COLLECTIONS } from './db';

const getRoomsCollection = async (): Promise<Collection<RoomProps>> => {
  const client = await clientPromise;
  return client.db(DB_NAME).collection<RoomProps>(COLLECTIONS.ROOMS);
};

export const loadRooms = async (): Promise<RoomProps[]> => {
  const collection = await getRoomsCollection();
  const rooms = await collection.find({}).toArray();
  return rooms;
};

export const loadRoom = async (slug: string): Promise<RoomProps> => {
  const collection = await getRoomsCollection();
  const room = await collection.findOne({ slug });
  if (!room) throw new Error('rooms.not-found');
  return room;
};

export const insertRoom = async (room: RoomProps): Promise<void> => {
  const collection = await getRoomsCollection();
  collection.insertOne(room);
};
