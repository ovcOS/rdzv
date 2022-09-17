import { createRoom } from '@/lib/api-server';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = RoomProps | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.body;
  await createRoom(name);
  res.status(200);
}
