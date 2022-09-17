import { setCurrentLocation } from './setCurrentLocation';
import { SetState } from './types';

export const setCurrentLocationAsOrigin = (setSelectedOrigin: SetState<LocationProps | null>) => {
  setCurrentLocation(setSelectedOrigin);
};
