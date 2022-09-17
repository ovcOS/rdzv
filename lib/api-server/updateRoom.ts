import { loadRoom, updateRoomInternal } from '../db';

export const updateRoom = async ({
  slug,
  participant,
  meetingLocation,
}: {
  slug: string;
  participant: ParticipantProps;
  meetingLocation?: LocationProps;
}): Promise<void> => {
  const room = await loadRoom(slug);
  if (!room) return;
  const newRoom = {
    ...room,
    participants: [...room.participants, participant],
    ...(meetingLocation ? { meetingLocation } : {}),
  };
  await updateRoomInternal(newRoom);
};
