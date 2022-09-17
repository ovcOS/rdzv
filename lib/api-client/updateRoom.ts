import { post } from './helpers';

export const updateRoom = async ({
  slug,
  participant,
  meetingLocation,
}: {
  slug: string;
  participant: ParticipantProps;
  meetingLocation?: LocationProps;
}) => {
  return await post('/api/updateRoom', { slug, participant, meetingLocation });
};
