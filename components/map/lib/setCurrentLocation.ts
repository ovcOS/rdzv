import { getCurrentPosition } from './getCurrentPosition';
import { logCurrentPositionError, logGeolocationNotSupportedError } from './logErrors';
import { SetState } from './types';

export const setCurrentLocation = (stateSetter: SetState<LocationProps> | SetState<LocationProps | null>) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      stateSetter(getCurrentPosition(position));
    }, logCurrentPositionError);
  } else {
    logGeolocationNotSupportedError();
  }
};
