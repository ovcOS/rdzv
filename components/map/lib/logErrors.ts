/* eslint-disable no-console */
import { DirectionsResult } from './types';

export const logCurrentPositionError = () => {
  console.error('something went wrong getting current position');
};

export const logGeolocationNotSupportedError = () => {
  console.error('geolocation not supported');
};

export const logInvalidStatusError = (result: DirectionsResult) => {
  console.error('uh oh, something went wrong', { result });
};
