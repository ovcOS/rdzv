if (!process.env.DB_NAME) {
  throw new Error('Please add your Mongo DB_NAME to .env.local');
}

export const DB_NAME = process.env.DB_NAME as string;

export const COLLECTIONS = Object.freeze({
  ROOMS: 'rooms',
});
