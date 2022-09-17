import { createRoom } from '@/lib/api-server';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = NoId<RoomProps> | undefined;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...room } = await createRoom(name);
  res.status(200).json(room);
}
