import { createRoom } from '@/lib/api-server';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = RoomProps | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.body;
  const room = await createRoom(name);
  res.status(200).json(room);
}
