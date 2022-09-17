import type { Dispatch, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;
export type PlaceResult = google.maps.places.PlaceResult;
export type AutocompleteProps = google.maps.places.Autocomplete;
export type DirectionsResult = google.maps.DirectionsResult;
export type DirectionsStatus = google.maps.DirectionsStatus;

export type OriginToFinalDestination = { origin: LocationProps; destination: LocationProps };
