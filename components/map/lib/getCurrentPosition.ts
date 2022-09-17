export const getCurrentPosition = (position: GeolocationPosition) => ({
  lat: position.coords.latitude,
  lng: position.coords.longitude,
});
