import type { AutocompleteProps, PlaceResult, SetState } from './types';

const getLocationFromPlaceResult = (placeResult: PlaceResult): LocationProps | null => {
  const lat = placeResult.geometry?.location?.lat();
  const lng = placeResult.geometry?.location?.lng();
  if (!lat || !lng) return null;
  return { lat, lng };
};

export const onAutocompletePlaceChanged = (
  autocomplete: AutocompleteProps | null,
  setSelectedOrigin: SetState<LocationProps | null>
) => {
  if (!autocomplete) return;
  const place = autocomplete.getPlace();
  const location = getLocationFromPlaceResult(place);
  setSelectedOrigin(location);
};
