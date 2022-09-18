import { OK_STATUS } from './constants';
import { logInvalidStatusError } from './logErrors';
import { DirectionsResult, DirectionsStatus, SetState } from './types';

export const directionsServiceCallback =
  (setDirectionsResult: SetState<DirectionsResult[]>) =>
  (result: DirectionsResult | null, status: DirectionsStatus) => {
    if (!result) return;
    if (status === OK_STATUS) {
      setDirectionsResult((existingResults) => [...existingResults, result]);
    } else {
      logInvalidStatusError(result);
    }
  };
