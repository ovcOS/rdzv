import { createRoom } from '@/lib/api';
import { loadRoom } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = RoomProps | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await createRoom('New Room');
  const room = await loadRoom('New Room');
  res.status(200).json(room);
}
