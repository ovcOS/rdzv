const PARTICIPANT_KEY = `RDZV_PARTIPIANT_ID`;

const newId = () => 'testParticipantId123';

export const getParticipantId = () => {
  if (typeof window === 'undefined') return newId();

  const participantId = window.localStorage.getItem(PARTICIPANT_KEY);
  if (participantId) return participantId;

  const newParticipantId = newId();
  localStorage.setItem(PARTICIPANT_KEY, newParticipantId);
  return newParticipantId;
};
