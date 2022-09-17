import { hasRoom } from '@/lib/api-server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<boolean>) {
  const { slug } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isRoomValid = await hasRoom(slug);
  res.status(200).json(isRoomValid);
}
