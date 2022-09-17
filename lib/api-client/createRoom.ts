import { post } from './helpers';

export const createRoom = async (name: string) => {
  await post('/api/createRoom', { name });
};
