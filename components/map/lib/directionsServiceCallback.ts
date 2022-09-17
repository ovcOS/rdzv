import { logInvalidStatusError } from './logErrors';
import { DirectionsResult, DirectionsStatus, SetState } from './types';

export const directionsServiceCallback =
  (setDirectionsResult: SetState<DirectionsResult[]>) =>
  (result: DirectionsResult | null, status: DirectionsStatus) => {
    if (!result) return;
    if (status === 'OK') {
      setDirectionsResult((existingResults) => [...existingResults, result]);
    } else {
      logInvalidStatusError(result);
    }
  };
