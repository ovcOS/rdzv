import { joinRoom } from '@/lib/api-server';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { ok: boolean } | undefined;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { slug, participant } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await joinRoom({ slug, participant });
  res.status(200).json({ ok: true });
}
