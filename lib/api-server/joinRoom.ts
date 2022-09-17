import { loadRoom, updateRoom } from '../db';

export const joinRoom = async ({
  slug,
  participant,
}: {
  slug: string;
  participant: ParticipantProps;
}): Promise<void> => {
  const room = await loadRoom(slug);
  if (!room) return;
  const newRoom = { ...room, participants: [...room.participants, participant] };
  await updateRoom(newRoom);
};
