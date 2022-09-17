import { getRandomNumber } from '../utils';

const PARTICIPANT_KEY = `RDZV_PARTICIPANT_ID`;

const newId = (): string => `participant-${getRandomNumber()}`;

export const getParticipantId = () => {
  if (typeof window === 'undefined') return newId();

  const participantId = window.localStorage.getItem(PARTICIPANT_KEY);
  if (participantId) return participantId;

  const newParticipantId = newId();
  localStorage.setItem(PARTICIPANT_KEY, newParticipantId);
  return newParticipantId;
};
