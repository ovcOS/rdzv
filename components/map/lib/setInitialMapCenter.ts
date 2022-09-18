import { setCurrentLocation } from './setCurrentLocation';
import type { SetState } from './types';

export const setInitialMapCenter = (setCenter: SetState<LocationProps>, existingMeetingLocation?: LocationProps) => {
  if (existingMeetingLocation) {
    setCenter(existingMeetingLocation);
    return;
  }
  setCurrentLocation(setCenter);
};
