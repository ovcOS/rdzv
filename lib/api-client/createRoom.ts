import { post } from './helpers';

export const createRoom = async (name: string) => {
  return await post('/api/createRoom', { name });
};
