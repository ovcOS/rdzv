import { createRoom } from '@/lib/api-server';
import { loadRoom } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = RoomProps | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.body;
  await createRoom(name);
  const room = await loadRoom(name);
  res.status(200).json(room);
}
