import { setCurrentLocation } from './setCurrentLocation';
import type { SetState } from './types';

export const setInitialMapCenter = (setCenter: SetState<LocationProps>, initialLocation?: LocationProps) => {
  if (initialLocation) {
    setCenter(initialLocation);
    return;
  }
  setCurrentLocation(setCenter);
};
