import { post } from './helpers';

export const joinRoom = async ({ slug, participant }: { slug: string; participant: ParticipantProps }) => {
  return await post('/api/joinRoom', { slug, participant });
};
