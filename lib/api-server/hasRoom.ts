import { loadRoom } from '../db';

export const hasRoom = async (slug: string): Promise<boolean> => {
  const room = await loadRoom(slug);
  return !!room;
};
