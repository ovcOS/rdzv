import { post } from './helpers';

export const hasRoom = async (slug: string) => await post('/api/hasRoom', { slug });
