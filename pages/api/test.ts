import { loadRoom } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = RoomProps | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const room = await loadRoom('testRoom');
  res.status(200).json(room);
}
