import { OriginToFinalDestination, SetState } from './types';

export const mapOriginsToFinalDestination = ({
  existingOrigins,
  participantOrigin,
  newMeetingLocation,
  setNewMeetingLocation,
}: {
  existingOrigins: LocationProps[];
  participantOrigin: LocationProps | null;
  newMeetingLocation: LocationProps | undefined;
  setNewMeetingLocation: SetState<LocationProps | undefined>;
}): OriginToFinalDestination[] => {
  const allOrigins = [...existingOrigins, ...(participantOrigin ? [participantOrigin] : [])];
  const meetingLocation = allOrigins.reduce(
    (res, location, index, original) => {
      const { length } = original;
      const { lat, lng } = location;
      const { lat: existingLat, lng: existingLng } = res;
      if (index + 1 === length) {
        return { lat: (existingLat + lat) / length, lng: (existingLng + lng) / length };
      }
      return { lat: existingLat + lat, lng: existingLng + lng };
    },
    { lat: 0, lng: 0 }
  );
  if (participantOrigin && !newMeetingLocation) {
    setNewMeetingLocation(meetingLocation);
  }
  return allOrigins.map((v) => ({ origin: v, destination: meetingLocation }));
};
